"use client";

import { ethers } from "ethers";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { toast } from "react-toastify";

import L2_SWAP_ABI from "abis/l2swap.json";
import WETH_ABI from "abis/weth.json";
import { SIGNER_INFOS, WEB3_SIGNER } from "atom/web3/signer/state";
import { Button, Card, Infos, Input, MyInfos } from "components/common";
import { ConnectButton } from "components/global/button/connect";

const L2_SWAP_ADDRESS = "0xDA49F943Be939Ef9eE1BdaB3C9D1644Baae763bb";
const L2_WETH_ADDRESS = "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa";

export const Layer2Swap = () => {
  const [input, setInput] = useState("");
  const [balance, setBalance] = useState("0");

  const signer = useAtomValue(WEB3_SIGNER);
  const { address } = useAtomValue(SIGNER_INFOS);

  const handleMax = () => {
    // todo: get max amount
    setInput("123000");
  };

  const handleSwap = async () => {
    if (!signer) return toast.error("Please connect your wallet first");
    const amount = ethers.utils.parseEther(input);

    try {
      const l2swap = new ethers.Contract(L2_SWAP_ADDRESS, L2_SWAP_ABI, signer);
      const weth = new ethers.Contract(L2_WETH_ADDRESS, WETH_ABI, signer);
      await weth.approve(L2_SWAP_ADDRESS, amount);
      await l2swap.swap(amount);
      toast.success("Success to swap");
    } catch (e) {
      toast.error("Transaction failed");
      console.error(e);
    }
  };

  return (
    <Card className="flex flex-col gap-4">
      {signer && (
        <div>
          <MyInfos address={address} available="123,000" baseSymbol={"WETH"} />
          <div className="divider !mb-1 before:bg-black/50 after:bg-black/50" />
        </div>
      )}
      <div className="flex flex-col gap-6">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="number"
          left={
            <div className="h-5 w-5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://svgshare.com/i/Bff.svg"
                title="weth"
                alt="weth"
              />
            </div>
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
          placeholder="WETH Amount"
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
          ["Reward fee", "0.025 svETH"],
        ]}
      />
    </Card>
  );
};
