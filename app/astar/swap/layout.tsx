import { PropsWithChildren } from "react";

import { Header } from "components/common";

export default function AstarSwap({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col gap-4">
      <Header
        title={
          <div className="flex items-end gap-4">
            <span>Astar Swap</span>
          </div>
        }
        subtitle="Trade tokens in Astar ecosystem !"
      />
      {children}
    </div>
  );
}
