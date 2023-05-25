"use client";

import { ethers } from "ethers";
import { useAtomValue } from "jotai";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import L1_SWAP_ABI from "abis/l1swap.json";
import WETH_ABI from "abis/weth.json";
import { WEB3_PROVIDERS } from "atom/web3/providers/state";
import { SIGNER_INFOS, WEB3_SIGNER } from "atom/web3/signer/state";
import { Button, Card, Infos, Input, MyInfos } from "components/common";
import { ConnectButton } from "components/global/button/connect";
import EthereumSvg from "public/icon/eth.svg";

const L1_SWAP_ADDRESS = "0x7C216fB3C5C22989d0D2556702ea7AeCF474245f";
const L1_WETH_ADDRESS = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";

export const Layer1Swap = ({ target }: { target: string }) => {
  const signer = useAtomValue(WEB3_SIGNER);
  const { address } = useAtomValue(SIGNER_INFOS);
  const providers = useAtomValue(WEB3_PROVIDERS);

  const [input, setInput] = useState("");
  const [balance, setBalance] = useState("0");

  const updateBalance = useCallback(async () => {
    const provider = providers?.["ethereum"];
    if (!signer || !provider) return;
    const weth = new ethers.Contract(L1_WETH_ADDRESS, WETH_ABI, provider);

    const [ethBalance, wethBalance] = await Promise.all([
      provider.getBalance(address),
      weth.balanceOf(address),
    ]);

    setBalance(
      ethers.utils.formatEther(target === "ETH" ? ethBalance : wethBalance)
    );
  }, [address, providers, signer, target]);

  const handleMax = () => setInput(balance);

  const handleSwap = async () => {
    if (!signer) return toast.error("Please connect your wallet first");
    const amount = ethers.utils.parseEther(input);

    try {
      const l1swap = new ethers.Contract(L1_SWAP_ADDRESS, L1_SWAP_ABI, signer);

      if (target === "ETH") {
        await l1swap.ethSwap({ value: amount });
      } else if (target === "WETH") {
        const weth = new ethers.Contract(L1_WETH_ADDRESS, WETH_ABI, signer);
        await (
          await weth.approve(L1_SWAP_ADDRESS, ethers.constants.MaxUint256)
        ).wait();
        await (await l1swap.wethSwap(amount)).wait();
      } else {
        return toast.error("Invalid target");
      }
    } catch (e) {
      toast.error("Transaction failed");
      console.error(e);
    }
  };

  useEffect(() => {
    updateBalance();
    return () => setBalance("0");
  }, [signer, updateBalance]);

  return (
    <Card className="flex flex-col gap-4">
      {signer && (
        <div>
          <MyInfos address={address} available={balance} baseSymbol={target} />
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
