"use client";

import { ethers } from "ethers";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { UPDATE_WEB3_PROVIDERS } from "atom/web3/providers/action";

export const Web3Providers = () => {
  const setProviders = useSetAtom(UPDATE_WEB3_PROVIDERS);

  useEffect(() => {
    const astarTestnetProvider = new ethers.providers.JsonRpcProvider(
      "https://evm.shibuya.astar.network"
    );

    const ethereumTestnetProvider = new ethers.providers.JsonRpcProvider(
      "https://eth-goerli.g.alchemy.com/v2/" +
        process.env.NEXT_PUBLIC_ALCHEMY_KEY
    );

    setProviders({
      astar: astarTestnetProvider,
      ethereum: ethereumTestnetProvider,
    });
  }, [setProviders]);

  return null;
};
