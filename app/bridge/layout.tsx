import { PropsWithChildren } from "react";
import { FaSync } from "react-icons/fa";

import { Header } from "components/common";

export default function BridgeLayout({ children }: PropsWithChildren) {
  // TODO: add a header for each bridge page

  return (
    <div className="flex flex-col gap-4">
      <Header
        title={
          <div className="flex items-end gap-4">
            <span>Bridge</span>
            <span className="flex items-center gap-2 text-lg">
              vETH
              <FaSync />
              vETH
            </span>
          </div>
        }
        subtitle="Move your vETH to Layer 2 by one step"
      />
      {children}
    </div>
  );
}
