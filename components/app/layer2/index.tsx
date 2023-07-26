"use client";

import { ethers } from "ethers";
import { useAtomValue, useSetAtom } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { Id, toast } from "react-toastify";

import L2_SWAP_ABI from "abis/l2swap.json";
import WETH_ABI from "abis/weth.json";
import { UPDATE_TOKENS } from "atom/web3/balance/action";
import { WEB3_PROVIDERS } from "atom/web3/providers/state";
import { SIGNER_INFOS, WEB3_SIGNER } from "atom/web3/signer/state";
import { Button, Card, Infos, Input, MyInfos } from "components/common";
import { ConnectButton } from "components/global/button/connect";

const L2_SWAP_ADDRESS = "0x2a90d4c4B799BD6238661E11920ad2E371046eEb";
const L2_WETH_ADDRESS = "0xB83508bB360Ad2c8726ba6E1746D03d4BCac387C";

export const Layer2Swap = () => {
  const signer = useAtomValue(WEB3_SIGNER);
  const { address } = useAtomValue(SIGNER_INFOS);
  const provider = useAtomValue(WEB3_PROVIDERS)?.["astar"];
  const updateTokens = useSetAtom(UPDATE_TOKENS);

  const [input, setInput] = useState("");
  const [balance, setBalance] = useState("0");

  const handleMax = () => setInput(balance);

  const handleSwap = async () => {
    if (!signer) return toast.error("Please connect your wallet first");
    const amount = ethers.utils.parseEther(input);

    let id1: Id | null = null;
    let id2: Id | null = null;

    try {
      const l2swap = new ethers.Contract(L2_SWAP_ADDRESS, L2_SWAP_ABI, signer);
      const weth = new ethers.Contract(L2_WETH_ADDRESS, WETH_ABI, signer);

      id1 = toast.loading("Waiting for approval");
      await (
        await weth.approve(L2_SWAP_ADDRESS, ethers.constants.MaxUint256)
      ).wait();

      toast.update(id1, {
        render: "Approval confirmed",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      id2 = toast.loading("Waiting for swap");
      await (await l2swap.swap(amount)).wait();

      toast.update(id2, {
        render: "Swap confirmed",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      updateBalance();
      updateTokens();
      setTimeout(() => {
        updateTokens();
      }, 1000);
    } catch (e) {
      if (id1) toast.dismiss(id1);
      if (id2) toast.dismiss(id2);
      toast.error("Transaction failed");
      console.error(e);
    }
  };

  const updateBalance = useCallback(async () => {
    if (!provider || !signer) return;

    const weth = new ethers.Contract(L2_WETH_ADDRESS, WETH_ABI, provider);
    const _balance = await weth.balanceOf(address);
    const balance = ethers.utils.formatEther(_balance);
    setBalance(balance);
    sessionStorage.setItem("l2_weth_balance", balance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, signer, provider]);

  useEffect(() => {
    if (!window.ethereum) return;

    (async () => {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + (81).toString(16) }],
      });
    })();
  }, []);

  useEffect(() => {
    const cachedBalance = sessionStorage.getItem("l2_weth_balance");
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
          <MyInfos address={address} available={balance} baseSymbol={"WETH"} />
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
