"use client";

import { ethers } from "ethers";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaAngleDown, FaSync } from "react-icons/fa";

import { SwapSelectModal } from "./select-modal";

import { SIGNER_INFOS, WEB3_SIGNER } from "atom/web3/signer/state";
import { Button, Card, Input, MyInfos2 } from "components/common";
import { ConnectButton } from "components/global/button/connect";
import { SupportTokens, VTokens, getTokenSymbol } from "helper/token";
import { getTokenImage, getVTokenImage } from "helper/token/images";
import { useAssets } from "hooks/useAssets";
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
    currencyId: VTokens.VATOM,
  },
  [Field.OUTPUT]: {
    currencyId: SupportTokens.Astr,
  },
};

const Assets = () => {
  const { address } = useAtomValue(SIGNER_INFOS);
  const { data } = useAssets(address, "ASTR");
  const assets = data.filter(({ symbol }) => symbol.includes("ATOM"));

  return (
    <MyInfos2 address={address} balanceText="Balance on hand" assets={assets} />
  );
};

export const AstarSwap = () => {
  const signer = useAtomValue(WEB3_SIGNER);
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

  useEffect(() => {
    if (!window.ethereum) return;

    (async () => {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + (81).toString(16) }],
      });
    })();
  }, []);

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

  const handleSwap = async () => {
    if (!signer) {
      return;
    }

    // 컨트랙트콜 (ATOM -> Astar swap)
    const astarSwapRouterAddress = "0xD28D77DaB1af0334c130AAAd09525e3762B2D50d";
    const l2VatomAddress = "0xAFc85AbC6DB664dAfF2Dc1007A0428cFCaDb392F";
    const l2WAstarAddress = "0x46744EB617FB56ee2364CD15Db9179C92012cb53";

    // approve first
    const vatom = new ethers.Contract(
      l2VatomAddress,
      ["function approve(address,uint256)"],
      signer
    );

    await (
      await vatom.approve(astarSwapRouterAddress, ethers.constants.MaxUint256)
    ).wait();

    const router = new ethers.Contract(
      astarSwapRouterAddress,
      [
        "function swapExactTokensForETH(uint,uint,address[],address,uint) external returns (uint[])",
      ],
      signer
    );

    await (
      await router.swapExactTokensForETH(
        ethers.utils.parseEther(inputState.typedValue), // uint amountIn,
        0, //uint amountOutMin,
        [l2VatomAddress, l2WAstarAddress], // address[] calldata path,
        await signer.getAddress(), // address to,
        ethers.constants.MaxUint256 //uint deadline
      )
    ).wait();
  };

  return (
    <Card className="flex flex-col gap-4">
      {signer && (
        <div>
          <Assets />
          <div className="divider !mb-1 before:bg-black/50 after:bg-black/50" />
        </div>
      )}
      <div className="flex flex-col gap-4">
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
          placeholder={`${getTokenSymbol(
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
