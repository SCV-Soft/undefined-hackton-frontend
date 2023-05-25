import { useAtomValue } from "jotai";

import { SCETH, VETH } from "atom/web3/balance/state";

export const Balance = () => {
  const vETH = useAtomValue(VETH);
  const scETH = useAtomValue(SCETH);

  return (
    <div className="flex flex-col gap-4">
      <dl>
        <dt className="text-black/50">Your vETH</dt>
        <dd className="text-xl font-semibold">
          {vETH.length > 10 ? vETH.slice(0, 10) + "..." : vETH}
        </dd>
      </dl>

      <dl>
        <dt className="text-black/50">Your scETH</dt>
        <dd className="text-xl font-semibold">
          {scETH.length > 10 ? scETH.slice(0, 10) + "..." : scETH}
        </dd>
      </dl>
    </div>
  );
};
