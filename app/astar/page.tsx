import { redirect } from "next/navigation";
import { FaSync } from "react-icons/fa";

import { VSwap } from "components/app/astar/vtoken";
import { Header } from "components/common";
import { VTokens } from "helper/token";

interface AstarPageProps {
  searchParams: {
    pair1: string;
    pair2: string;
  };
}

export default function AstarPage({ searchParams }: AstarPageProps) {
  const { pair1: _pair1, pair2: _pair2 } = searchParams ?? {};

  const upperPair1 = _pair1?.toUpperCase();
  const upperPair2 = _pair2?.toUpperCase();

  const pair1 = Object.values(VTokens).find((token) =>
    token.includes(upperPair1)
  );
  const pair2 = Object.values(VTokens).find((token) =>
    token.includes(upperPair2)
  );

  if (!pair1 || !pair2) return redirect("/astar?pair1=eth&pair2=atom");

  return (
    <div className="flex flex-col gap-4">
      <Header
        title={
          <div className="flex items-end gap-4">
            <span>Astar Swap</span>
            <span className="flex items-center gap-2 text-lg">
              v{upperPair1}
              <FaSync />v{upperPair2}
            </span>
          </div>
        }
        subtitle={`Swap v${upperPair1} to v${upperPair2} the next generation LSD Token`}
      />
      <VSwap {...{ pair1, pair2 }} />
    </div>
  );
}
