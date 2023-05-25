import { ethers } from "ethers";
import { atom } from "jotai";

import { WEB3_PROVIDERS } from "./state";

type Arg = {
  [key: string]: ethers.providers.JsonRpcProvider;
};

export const UPDATE_WEB3_PROVIDERS = atom<null, [Arg], void>(
  null,
  (_, set, provider) => set(WEB3_PROVIDERS, provider)
);
