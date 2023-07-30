import { redirect } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

import { CosmosAstarSwap } from "components/app/bridge/cosmos-astar";
import { ETHAstarSwap } from "components/app/bridge/eth-astar";
import { ETHPolygonSwap } from "components/app/bridge/eth-polygon";
import { Header } from "components/common";

interface Pairs {
  pair1: string;
  pair2: string;
}

const BridgePageContent = ({ pair1, pair2 }: Pairs) => {
  switch (`${pair1}-${pair2}`) {
    case "atom-astr":
      return <CosmosAstarSwap />;
    case "eth-astr":
      return <ETHAstarSwap />;
    case "eth-dot":
      return <ETHPolygonSwap />;
    default:
      return redirect("/bridge?pair1=eth&pair2=astr");
  }
};

export default function BridgePage({ searchParams }: { searchParams: Pairs }) {
  const { pair1, pair2 } = searchParams || {};

  return (
    <div className="flex flex-col gap-4">
      <Header
        title={
          <div className="flex items-end gap-4">
            <span>Bridge</span>
            <span className="flex items-center gap-2 text-lg">
              {`v${pair1?.toUpperCase()}`}
              <FaArrowRight />
              {`v${pair2?.toUpperCase()}`}
            </span>
          </div>
        }
        subtitle="Move your vETH to Layer 2 by one step"
      />
      <BridgePageContent {...{ pair1, pair2 }} />
    </div>
  );
}
