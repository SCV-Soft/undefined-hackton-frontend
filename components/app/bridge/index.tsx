"use client";

import { ethers } from "ethers";
import { useAtomValue, useSetAtom } from "jotai";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import BRIDGE_ABI from "abis/bridge.json";
import VETH_ABI from "abis/veth.json";
import { UPDATE_TOKENS } from "atom/web3/balance/action";
import { WEB3_PROVIDERS } from "atom/web3/providers/state";
import { SIGNER_INFOS, WEB3_SIGNER } from "atom/web3/signer/state";
import { Button, Card, Infos, Input, MyInfos } from "components/common";
import { ConnectButton } from "components/global/button/connect";
import LogoSvg from "public/logo.svg";

const L1_VETH_ADDRESS = "0xfC6ae96facE347BB6419859C1592825B96224ab0";
const L1_BRIDGE_ADDRESS = "0x66AC44FC2b84B6618D09b61BFd52d85Dc17daCAb";

export const BridgeSwap = () => {
  const signer = useAtomValue(WEB3_SIGNER);
  const { address } = useAtomValue(SIGNER_INFOS);
  const provider = useAtomValue(WEB3_PROVIDERS)?.["ethereum"];
  const updateTokens = useSetAtom(UPDATE_TOKENS);

  const [input, setInput] = useState("");
  const [balance, setBalance] = useState("0");

  const updateBalance = useCallback(async () => {
    if (!signer || !provider) return;

    const veth = new ethers.Contract(L1_VETH_ADDRESS, VETH_ABI, provider);
    const _balance = await veth.balanceOf(address);
    const balance = ethers.utils.formatEther(_balance);
    setBalance(balance);
    sessionStorage.setItem("veth_balance", balance);
  }, [address, provider, signer]);

  const handleMax = () => setInput(balance);

  const handleSwap = async () => {
    if (!signer) return toast.error("Please connect your wallet first");

    const amount = ethers.utils.parseEther(input);
    try {
      const veth = new ethers.Contract(L1_VETH_ADDRESS, VETH_ABI, signer);

      const id = toast.loading("Waiting for approval");

      await (
        await veth.approve(L1_BRIDGE_ADDRESS, ethers.constants.MaxUint256)
      ).wait();

      toast.update(id, {
        render: "Approval confirmed",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      const id2 = toast.loading("Waiting for transaction");

      const l1bridge = new ethers.Contract(
        L1_BRIDGE_ADDRESS,
        BRIDGE_ABI,
        signer
      );

      await (
        await l1bridge.deposit(
          L1_VETH_ADDRESS,
          80001,
          amount,
          address,
          await l1bridge.nonce(address)
        )
      ).wait();

      toast.update(id2, {
        render: "Transaction confirmed",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      updateBalance();
      updateTokens();
    } catch (e) {
      toast.error("Transaction failed");
      console.error(e);
    }
  };

  useEffect(() => {
    const cachedBalance = sessionStorage.getItem("veth_balance");
    if (cachedBalance) setBalance(cachedBalance);
    updateBalance();
    return () => {
      setBalance("0");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateBalance]);

  return (
    <Card className="flex flex-col gap-4">
      {signer && (
        <div>
          <MyInfos address={address} available={balance} baseSymbol="vETH" />
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
