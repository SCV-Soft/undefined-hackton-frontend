import { FaSync } from "react-icons/fa";

import { Swap } from "components/app/swap";
import { Header } from "components/common";

export default function Layer1Page() {
  return (
    <div className="flex flex-col gap-4">
      <Header
        title={
          <div className="flex items-end gap-4">
            <span>Layer 1 Swap</span>
            <span className="flex items-center gap-2 text-lg">
              vETH
              <FaSync />
              ETH
            </span>
          </div>
        }
        subtitle="Swap ETH to vETH the next generation LSD Token"
      />
      <Swap />
    </div>
  );
}
