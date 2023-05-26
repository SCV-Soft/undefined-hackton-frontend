import { PropsWithChildren } from "react";

import { LifeCycle } from "./life-cycle";
import { Web3Providers } from "./web3providers";

export const Configs = ({ children }: PropsWithChildren) => {
  return (
    <LifeCycle>
      <Web3Providers />
      {children}
    </LifeCycle>
  );
};
