import { Layer2Swap } from "components/app/layer2";
import { Header } from "components/common";

interface Layer2PageProps {
  searchParams: {
    target: string;
  };
}

export default function Layer2Page({ searchParams }: Layer2PageProps) {
  const target = searchParams?.target?.toUpperCase() ?? "";

  return (
    <div className="flex flex-col gap-4">
      <Header
        title={
          <div className="flex items-end gap-4">
            <span>Layer 2 Swap</span>
            <span className="flex items-center gap-2 text-lg">Astar</span>
          </div>
        }
        subtitle="Swap WETH to vETH the next generation LSD Token"
      />
      <Layer2Swap />
    </div>
  );
}
