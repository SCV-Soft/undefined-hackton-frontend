"use client";

import { useAtomValue } from "jotai";
import { useState } from "react";
import { FaSync } from "react-icons/fa";

import { SIGNER_INFOS, WEB3_SIGNER } from "atom/web3/signer/state";
import { Button, Card, Input, MyInfos, MyInfos2 } from "components/common";
import { ConnectButton } from "components/global/button/connect";
import { useDeriveValue } from "hooks/useDeriveValue";

interface ETHCosmosVSwapProps {
  pair1: string;
  pair2: string;
}

export enum Field {
  INPUT = "INPUT",
  OUTPUT = "OUTPUT",
}

export type SwapState = {
  independentField: Field;
  typedValue: string;
  [Field.INPUT]: {
    currencyId: string | null;
  };
  [Field.OUTPUT]: {
    currencyId: string | null;
  };
};

type FetchArgs = {
  from: string;
  to: string;
  amount: string;
};

// TODO: update content page for swap
export const ETHCosmosVSwap = ({ pair1, pair2 }: ETHCosmosVSwapProps) => {
  const signer = useAtomValue(WEB3_SIGNER);
  const { address } = useAtomValue(SIGNER_INFOS);

  const initialState: SwapState = {
    independentField: Field.INPUT,
    typedValue: "",
    [Field.INPUT]: {
      currencyId: pair1,
    },
    [Field.OUTPUT]: {
      currencyId: pair2,
    },
  };

  const [inputState, setInputCurrency] = useState<SwapState>(initialState);
  const { independentField, typedValue } = inputState;

  const dependentField =
    independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT;

  const deriveValue = useDeriveValue({ pair1, pair2, amount: typedValue });

  const formattedAmount = {
    [independentField]: typedValue,
    [dependentField]: deriveValue ?? "",
  };

  const handleTypeInput = (value: string, field: Field) => {
    setInputCurrency((prev) => ({
      ...prev,
      independentField: field,
      typedValue: value,
    }));
  };

  const handleSwap = async () => {};

  // TODO: get balance for each token

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
            ""
            // TODO: add icon
            // <Image src={EthereumSvg} width={14} height={14} alt="ethereum" />
          }
          placeholder={`v${pair1?.toUpperCase()} Amount`}
        />
        <div className="mx-auto text-black">
          <FaSync />
        </div>
        <Input
          value={formattedAmount[Field.OUTPUT]}
          onChange={(e) => handleTypeInput(e.target.value, Field.OUTPUT)}
          type="number"
          left={
            ""
            // TODO: add icon
            // <Image src={EthereumSvg} width={14} height={14} alt="ethereum" />
          }
          placeholder={`v${pair2?.toUpperCase()} Amount`}
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
