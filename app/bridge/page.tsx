import { FaSync } from "react-icons/fa";

import { BridgeSwap } from "components/app/bridge";
import { Layer1Swap } from "components/app/layer1";
import { Header } from "components/common";

interface Layer1PageProps {
  searchParams: {
    target: string;
  };
}

export default function BridgePage({ searchParams }: Layer1PageProps) {
  const target = searchParams?.target?.toUpperCase() ?? "";

  return (
    <div className="flex flex-col gap-4">
      <Header
        title={
          <div className="flex items-end gap-4">
            <span>Layer 1 Swap</span>
            <span className="flex items-center gap-2 text-lg">
              vETH
              <FaSync />
              {target}
            </span>
          </div>
        }
        subtitle={`Swap ${target} to vETH the next generation LSD Token`}
      />
      <BridgeSwap target={target} />
    </div>
  );
}
