import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

import { UPDATE_TOKENS } from "atom/web3/balance/action";
import { L1_VETH, L2_VETH, SCETH } from "atom/web3/balance/state";

export const Balance = () => {
  const L1vETH = useAtomValue(L1_VETH);
  const L2vETH = useAtomValue(L2_VETH);
  const scETH = useAtomValue(SCETH);

  const updateTokens = useSetAtom(UPDATE_TOKENS);

  useEffect(() => {
    updateTokens();
  }, [updateTokens]);

  return (
    <div className="flex flex-col gap-3">
      <dl>
        <dt className="text-black/50">scETH</dt>
        <dd className="text-xl font-semibold">
          {scETH.length > 10 ? scETH.slice(0, 10) + "..." : scETH}
        </dd>
      </dl>

      <dl>
        <dt className="text-black/50">vETH Layer 1</dt>
        <dd className="text-xl font-semibold">
          {L1vETH.length > 10 ? L1vETH.slice(0, 10) + "..." : L1vETH}
        </dd>
      </dl>

      <dl>
        <dt className="text-black/50">vETH Layer 2</dt>
        <dd className="text-xl font-semibold">
          {L2vETH.length > 10 ? L2vETH.slice(0, 10) + "..." : L2vETH}
        </dd>
      </dl>
    </div>
  );
};
