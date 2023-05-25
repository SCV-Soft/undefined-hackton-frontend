import { PropsWithChildren } from "react";

import { Web3Providers } from "./web3providers";

export const Configs = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Web3Providers />
      {children}
    </>
  );
};
