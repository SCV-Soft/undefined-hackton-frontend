import { ethers } from "ethers";
import { atom } from "jotai";

export const WEB3_SIGNER = atom<null | ethers.providers.JsonRpcSigner>(null);

export const SIGNER_INFOS = atom<{ address: string }>({ address: "" });
