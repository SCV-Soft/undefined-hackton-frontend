import { redirect } from "next/navigation";

import { CosmosAstarSwap } from "components/app/bridge/cosmos-astar";
import { ETHAstarSwap } from "components/app/bridge/eth-astar";
import { ETHLayerSwap } from "components/app/bridge/eth-layer";

export default function BridgePage({
  searchParams,
}: {
  searchParams: {
    pair1: string;
    pair2: string;
  };
}) {
  const { pair1, pair2 } = searchParams || {};

  switch (`${pair1}-${pair2}`) {
    case "eth-astar":
      return <ETHAstarSwap />;
    case "atom-astar":
      return <CosmosAstarSwap />;
    case "l1eth-l2eth":
      return <ETHLayerSwap />;
    default:
      return redirect("/bridge?pair1=eth&pair2=astar");
  }
}
