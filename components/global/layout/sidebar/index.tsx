"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import {
  AstarNetworkMenu,
  BridgeMenu,
  Layer1SwapMenu,
  Layer2SwapMenu,
} from "./links";

import LogoSvg from "public/logo.png";

export const Menu = () => {
  const target = useSearchParams().get("target");

  return (
    <ul className="menu rounded-box bg-transparent p-2">
      <AstarNetworkMenu />
      <div className="divider !my-1" />
      <Layer1SwapMenu target={target} />
      <div className="divider !my-1" />
      <Layer2SwapMenu target={target} />
      <div className="divider !my-1" />
      <BridgeMenu />
    </ul>
  );
};

export const Side = () => {
  return (
    <aside className="min-h-screen px-10 py-8 shadow-xl">
      <div className="flex h-full flex-col gap-8">
        <Image src={LogoSvg} alt="logo" width={176} />
        <div className="grow">
          <Menu />
        </div>
      </div>
    </aside>
  );
};
