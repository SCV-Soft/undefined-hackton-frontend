"use client";

import { ethers } from "ethers";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { UPDATE_WEB3_PROVIDERS } from "atom/web3/providers/action";

export const Web3Providers = () => {
  const setProviders = useSetAtom(UPDATE_WEB3_PROVIDERS);

  useEffect(() => {
    const polygonTestnetProvider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mumbai.maticvigil.com/"
    );

    const ethereumTestnetProvider = new ethers.providers.JsonRpcProvider(
      "https://eth-goerli.g.alchemy.com/v2/" +
        process.env.NEXT_PUBLIC_ALCHEMY_KEY
    );

    setProviders({
      polygon: polygonTestnetProvider,
      ethereum: ethereumTestnetProvider,
    });
  }, [setProviders]);

  return null;
};
