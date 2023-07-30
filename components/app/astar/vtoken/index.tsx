"use client";

import { ethers } from "ethers";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaSync } from "react-icons/fa";

import { SIGNER_INFOS, WEB3_SIGNER } from "atom/web3/signer/state";
import { Button, Card, Input, MyInfos, MyInfos2 } from "components/common";
import { ConnectButton } from "components/global/button/connect";
import { VTokens } from "helper/token";
import { getVTokenImage } from "helper/token/images";
import { useAssets } from "hooks/useAssets";
import { useDeriveValue } from "hooks/useDeriveValue";

interface VSwapProps {
  pair1: VTokens;
  pair2: VTokens;
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

const Assets = ({ pair1, pair2 }: VSwapProps) => {
  const { address } = useAtomValue(SIGNER_INFOS);
  const { data } = useAssets(address, "ASTR");

  const assets = data.filter(
    (item) => pair1.includes(item.symbol) || pair2.includes(item.symbol)
  );

  return (
    <MyInfos2 address={address} balanceText="Balance on hand" assets={assets} />
  );
};

export const VSwap = ({ pair1, pair2 }: VSwapProps) => {
  const signer = useAtomValue(WEB3_SIGNER);

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

  const handleSwap = async () => {
    if (!signer) {
      return;
    }

    // 컨트랙트콜 (vETH -> vATOM swap)
    const astarSwapRouterAddress = "0xD28D77DaB1af0334c130AAAd09525e3762B2D50d";
    const l2VethAddress = "0xFF847bef92cdF7587341C7F1c8De03A35F4eE44D";
    const l2VatomAddress = "0xAFc85AbC6DB664dAfF2Dc1007A0428cFCaDb392F";

    // approve first
    const veth = new ethers.Contract(
      l2VethAddress,
      ["function approve(address,uint256)"],
      signer
    );

    await (
      await veth.approve(astarSwapRouterAddress, ethers.constants.MaxUint256)
    ).wait();

    const router = new ethers.Contract(
      astarSwapRouterAddress,
      [
        "function swapExactTokensForTokens(uint,uint,address[],address,uint) external returns (uint[])",
      ],
      signer
    );

    await (
      await router.swapExactTokensForTokens(
        ethers.utils.parseEther(inputState.typedValue), // uint amountIn,
        0, // uint amountOutMin,
        [l2VethAddress, l2VatomAddress], // address[] calldata path,
        await signer.getAddress(), // address to,
        ethers.constants.MaxUint256 // uint deadline
      )
    ).wait();
  };

  // TODO: get balance for each token

  return (
    <Card className="flex flex-col gap-4">
      {signer && (
        <div>
          <Assets {...{ pair1, pair2 }} />
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
              src={getVTokenImage(pair1)}
              width={18}
              height={18}
              alt="vtoken1"
            />
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
            <Image
              src={getVTokenImage(pair2)}
              width={18}
              height={18}
              alt="vtoken1"
            />
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
