"use client";

import { useAtomValue } from "jotai";
import Image from "next/image";
import { useState } from "react";

import { SIGNER_INFOS, WEB3_SIGNER } from "atom/web3/signer/state";
import { Button, Card, Infos, Input, MyInfos } from "components/common";
import { ConnectButton } from "components/global/button/connect";
import EthereumSvg from "public/icon/eth.svg";

export const Layer1Swap = ({ target }: { target: string }) => {
  const [input, setInput] = useState("");
  const signer = useAtomValue(WEB3_SIGNER);
  const { address } = useAtomValue(SIGNER_INFOS);

  const handleMax = () => {
    // todo: get max amount
    setInput("123000");
  };

  const handleSwap = () => {};

  return (
    <Card className="flex flex-col gap-4">
      {signer && (
        <div>
          <MyInfos address={address} available="123,000" baseSymbol={target} />
          <div className="divider !mb-1 before:bg-black/50 after:bg-black/50" />
        </div>
      )}
      <div className="flex flex-col gap-6">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="number"
          left={
            <Image src={EthereumSvg} width={14} height={14} alt="ethereum" />
          }
          right={
            signer && (
              <button
                onClick={handleMax}
                className="btn-ghost btn-xs btn rounded-full bg-blue-500 text-white hover:bg-blue-600"
              >
                Max
              </button>
            )
          }
          placeholder={target + " Amount"}
        />
        {!signer ? (
          <ConnectButton />
        ) : (
          <Button onClick={handleSwap} label="Swap" />
        )}
      </div>
      <Infos
        data={[
          ["You will receive", "1.1424 vETH"],
          ["Exchange rate", "1 ETH = 0.95 vETH"],
          ["Max transaction cost", "$ 10.84"],
        ]}
      />
    </Card>
  );
};