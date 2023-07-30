"use client";

import { useAtomValue } from "jotai";
import Image from "next/image";
import { useState } from "react";
import { FaAngleDown, FaSync } from "react-icons/fa";

import { SwapSelectModal } from "./select-modal";

import { SIGNER_INFOS, WEB3_SIGNER } from "atom/web3/signer/state";
import { Button, Card, Input, MyInfos2 } from "components/common";
import { ConnectButton } from "components/global/button/connect";
import { SupportTokens, VTokens, getTokenSymbol } from "helper/token";
import { getTokenImage, getVTokenImage } from "helper/token/images";
import { useDeriveValue } from "hooks/useDeriveValue";
import { useModal } from "hooks/useModal";

export enum Field {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}

export type SwapState = {
  independentField: Field;
  typedValue: string;
  [Field.INPUT]: {
    currencyId: VTokens;
  };
  [Field.OUTPUT]: {
    currencyId: SupportTokens;
  };
};

const initialState: SwapState = {
  independentField: Field.INPUT,
  typedValue: "",
  [Field.INPUT]: {
    currencyId: VTokens.VETH,
  },
  [Field.OUTPUT]: {
    currencyId: SupportTokens.Astr,
  },
};

export const AstarSwap = () => {
  // TODO: add token select modal
  // TODO: check v token select
  const signer = useAtomValue(WEB3_SIGNER);
  const { address } = useAtomValue(SIGNER_INFOS);
  const { modal } = useModal();

  const [inputState, setInputCurrency] = useState<SwapState>(initialState);
  const { independentField, typedValue } = inputState;

  const dependentField =
    independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;

  const deriveValue = useDeriveValue({
    pair1: inputState[Field.INPUT].currencyId,
    pair2: inputState[Field.OUTPUT].currencyId,
    amount: typedValue,
  });

  const formattedAmount = {
    [independentField]: typedValue,
    [dependentField]:
      dependentField === Field.INPUT ? deriveValue?.in : deriveValue?.out,
  };

  const handleTypeInput = (value: string, field: Field) => {
    setInputCurrency((prev) => ({
      ...prev,
      independentField: field,
      typedValue: value,
    }));
  };

  const handleSelectVToken = () => {};

  const handleSelectToken = () => {
    modal(
      <SwapSelectModal
        onSelectToken={(token) => {
          setInputCurrency((prev) => ({
            ...prev,
            [Field.OUTPUT]: {
              currencyId: token,
            },
          }));
        }}
      />
    );
  };

  const handleSwap = () => {};

  // TODO: get balance for v token

  return (
    <Card className="flex flex-col gap-4">
      {signer && (
        <div>
          {/* <MyInfos2
            address={address}
            balanceText="Balance on hand"
            assets={assets}
          /> */}
          <div className="divider !mb-1 before:bg-black/50 after:bg-black/50" />
        </div>
      )}
      <div className="flex flex-col gap-6">
        <Input
          value={formattedAmount[Field.INPUT]}
          onChange={(e) => handleTypeInput(e.target.value, Field.INPUT)}
          type="number"
          left={
            <Image
              src={getVTokenImage(VTokens.VATOM)}
              width={18}
              height={18}
              alt="atom"
            />
          }
          placeholder={`v${"ATOM"?.toUpperCase()} Amount`}
        />
        <div className="mx-auto text-black">
          <FaSync />
        </div>
        <Input
          value={formattedAmount[Field.OUTPUT]}
          onChange={(e) => handleTypeInput(e.target.value, Field.OUTPUT)}
          type="number"
          left={
            <Image
              src={getTokenImage(inputState[Field.OUTPUT].currencyId)}
              width={18}
              height={18}
              alt="token"
            />
          }
          right={
            <button className="flex items-center" onClick={handleSelectToken}>
              <FaAngleDown className="text-black/80" />
            </button>
          }
          placeholder={`v${getTokenSymbol(
            inputState[Field.OUTPUT].currencyId
          )} Amount`}
        />
        {!signer ? (
          <ConnectButton />
        ) : (
          <Button onClick={handleSwap} label="Swap" />
        )}
      </div>
    </Card>
  );
};
