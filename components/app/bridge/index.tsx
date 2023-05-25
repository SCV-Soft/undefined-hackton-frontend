"use client";

import { ethers } from "ethers";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

import BRIDGE_ABI from "abis/bridge.json";
import VETH_ABI from "abis/veth.json";
import { SIGNER_INFOS, WEB3_SIGNER } from "atom/web3/signer/state";
import { Button, Card, Infos, Input, MyInfos } from "components/common";
import { ConnectButton } from "components/global/button/connect";
import LogoSvg from "public/logo.svg";

const L1_VETH_ADDRESS = "0xfC6ae96facE347BB6419859C1592825B96224ab0";
const L1_BRIDGE_ADDRESS = "0x66AC44FC2b84B6618D09b61BFd52d85Dc17daCAb";

export const BridgeSwap = () => {
  const signer = useAtomValue(WEB3_SIGNER);
  const { address } = useAtomValue(SIGNER_INFOS);

  const [input, setInput] = useState("");
  // todo: get balance from api
  const [balance, setBalance] = useState("0");

  const handleMax = () => {
    // todo: get max amount
    setInput("123000");
  };

  const handleSwap = async () => {
    if (!signer) return toast.error("Please connect your wallet first");

    const amount = ethers.utils.parseEther(input);
    try {
      const veth = new ethers.Contract(L1_VETH_ADDRESS, VETH_ABI, signer);
      const tx = await veth.approve(
        L1_BRIDGE_ADDRESS,
        ethers.constants.MaxUint256
      );
      await tx.wait();

      // todo: loading spin

      const l1bridge = new ethers.Contract(
        L1_BRIDGE_ADDRESS,
        BRIDGE_ABI,
        signer
      );
      await l1bridge.deposit(
        L1_VETH_ADDRESS,
        80001,
        amount,
        address,
        await l1bridge.nonce(address)
      );
      toast.success("Your vETH is on the way");
    } catch (e) {
      toast.error("Transaction failed");
      console.error(e);
    }
  };

  return (
    <Card className="flex flex-col gap-4">
      {signer && (
        <div>
          <MyInfos address={address} available="123,000" baseSymbol="vETH" />
          <div className="divider !mb-1 before:bg-black/50 after:bg-black/50" />
        </div>
      )}
      <div className="flex flex-col gap-6">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="number"
          left={<Image src={LogoSvg} width={16} height={16} alt="v-ether" />}
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
          placeholder="vETH Amount"
        />
        {!signer ? (
          <ConnectButton />
        ) : (
          <Button onClick={handleSwap} label="Transfer" />
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
