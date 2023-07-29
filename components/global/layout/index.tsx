import { PropsWithChildren } from "react";

import { Side } from "./sidebar";

export const GlobalLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="flex">
      {/* side bar */}
      <aside className="min-w-[100px]">
        <Side />
      </aside>
      <section className="mx-auto pt-36">{children}</section>
    </main>
  );
};
