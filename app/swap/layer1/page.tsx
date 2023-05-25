import Image from "next/image";
import { FaSync } from "react-icons/fa";

import { Button, Card, Header, Infos, Input } from "components/common";
import EthereumSvg from "public/icon/eth.svg";

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
      <Card className="flex flex-col gap-4">
        <Input
          left={
            <Image src={EthereumSvg} width={14} height={14} alt="ethereum" />
          }
          right={
            <button className="btn-ghost btn-xs btn rounded-full bg-blue-500 text-white hover:bg-blue-600">
              Max
            </button>
          }
          placeholder="ETH Amount"
        />
        <Button label="Connect Wallet" />
        <Infos
          data={[
            ["You will receive", "1.1424 vETH"],
            ["Exchange rate", "1 ETH = 0.95 vETH"],
            ["Max transaction cost", "$ 10.84"],
          ]}
        />
      </Card>
    </div>
  );
}
