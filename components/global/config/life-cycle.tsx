"use client";

import { PropsWithChildren, useEffect } from "react";

export const LifeCycle = ({ children }: PropsWithChildren) => {
  useEffect(() => () => sessionStorage.clear(), []);

  return <>{children}</>;
};
