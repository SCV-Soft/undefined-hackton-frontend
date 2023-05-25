import { ethers } from "ethers";
import { atom } from "jotai";

import { SIGNER_INFOS, WEB3_SIGNER } from "./state";

export const UPDATE_WEB3_SIGNER = atom<
  null,
  [ethers.providers.JsonRpcSigner],
  void
>(null, (_, set, signer) => set(WEB3_SIGNER, signer));

export const UPDATE_SIGNER_INFOS = atom<
  null,
  [{ address: string } | null],
  void
>(null, (_, set, infos) => set(SIGNER_INFOS, infos));
