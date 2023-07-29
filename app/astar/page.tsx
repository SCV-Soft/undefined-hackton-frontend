import { redirect } from "next/navigation";
import { FaSync } from "react-icons/fa";

import { CosmosPolygonVSwap } from "components/app/astar/vtoken/atom-dot";
import { ETHCosmosVSwap } from "components/app/astar/vtoken/eth-atom";
import { ETHPolygonVSwap } from "components/app/astar/vtoken/eth-dot";
import { Header } from "components/common";

interface AstarPageProps {
  searchParams: {
    pair1: string;
    pair2: string;
  };
}

const AstarPageContent = ({
  pair1,
  pair2,
}: {
  pair1: string;
  pair2: string;
}) => {
  switch (`${pair1}-${pair2}`) {
    case "eth-atom":
      return <ETHCosmosVSwap />;
    case "eth-dot":
      return <ETHPolygonVSwap />;
    case "atom-dot":
      return <CosmosPolygonVSwap />;
    default:
      return redirect("/astar?pair1=eth&pair2=atom");
  }
};

export default function AstarPage({ searchParams }: AstarPageProps) {
  const { pair1, pair2 } = searchParams ?? {};

  return (
    <div className="flex flex-col gap-4">
      <Header
        title={
          <div className="flex items-end gap-4">
            <span>Astar Swap</span>
            <span className="flex items-center gap-2 text-lg">
              v{pair1?.toUpperCase()}
              <FaSync />v{pair2?.toUpperCase()}
            </span>
          </div>
        }
        subtitle={`Swap ${pair1?.toUpperCase()} to v${pair2?.toUpperCase()} the next generation LSD Token`}
      />
      <AstarPageContent {...{ pair1, pair2 }} />
    </div>
  );
}
