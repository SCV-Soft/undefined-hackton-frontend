import { FaSync } from "react-icons/fa";

import { BridgeSwap } from "components/app/bridge";
import { Header } from "components/common";

export default function BridgePage() {
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
      <BridgeSwap />
    </div>
  );
}
