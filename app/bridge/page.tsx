import { redirect } from "next/navigation";

import { CosmosAstarSwap } from "components/app/bridge/cosmos-astar";
import { ETHAstarSwap } from "components/app/bridge/eth-astar";
import { ETHPolygonSwap } from "components/app/bridge/eth-polygon";

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
    case "atom-astar":
      return <CosmosAstarSwap />;
    case "eth-astar":
      return <ETHAstarSwap />;
    case "eth-polygon":
      return <ETHPolygonSwap />;
    default:
      return redirect("/bridge?pair1=eth&pair2=astar");
  }
}
