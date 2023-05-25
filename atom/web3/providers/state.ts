import { ethers } from "ethers";
import { atom } from "jotai";

type Web3Provider = {
  [key: string]: ethers.providers.JsonRpcProvider;
};

export const WEB3_PROVIDERS = atom<Web3Provider | null>(null);
