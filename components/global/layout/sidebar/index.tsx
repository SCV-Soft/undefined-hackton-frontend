"use client";

import clsx from "clsx";
import { useAtomValue } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { FaSync } from "react-icons/fa";

import { Balance } from "../balance";

import { WEB3_SIGNER } from "atom/web3/signer/state";
import { useTBD } from "hooks/useTBD";
import LogoSvg from "public/logo.png";

interface MenuLinkItemProps {
  href: string;
  label: ReactNode;
  active?: boolean;
}

const MenuLinkItem = ({ href, label, active }: MenuLinkItemProps) => {
  return (
    <li>
      <Link
        className={clsx([active ? "font-bold text-black/80" : "text-black/40"])}
        href={href}
      >
        {label}
      </Link>
    </li>
  );
};

export const Menu = () => {
  const { openTBD } = useTBD();

  const path = usePathname();
  const target = useSearchParams().get("target");

  return (
    <ul className="menu rounded-box bg-transparent p-2">
      <li className="menu-title">
        <span>Layer 1 Swap</span>
      </li>
      {[
        {
          href: "/swap/layer1?target=eth",
          label: (
            <span className="flex items-center gap-2">
              vETH
              <FaSync />
              ETH
            </span>
          ),
        },
        {
          href: "/swap/layer1?target=weth",
          label: (
            <span className="flex items-center gap-2">
              vETH
              <FaSync />
              wETH
            </span>
          ),
        },
      ].map(({ href, label }) => (
        <MenuLinkItem
          key={`menu-${href}`}
          active={href.split("target=")[1] === target}
          {...{ href, label }}
        />
      ))}

      <div className="divider !my-1" />

      <li className="menu-title">
        <span>Layer 2 Swap</span>
      </li>
      {[
        { href: "/swap/layer2?target=", label: "Astar" },
        { href: "#", label: "Abitrum" },
        { href: "#", label: "Loopring (LRC)" },
        { href: "#", label: "Immutable X" },
        { href: "#", label: "xDai Chain" },
      ].map(({ href, label }) => {
        if (href === "#") {
          return (
            <li key={`menu-${label}`}>
              <span className="text-black/40" onClick={openTBD}>
                {label}
              </span>
            </li>
          );
        }
        return (
          <MenuLinkItem
            key={`menu-${href}`}
            active={href.split("target=")[1] === target}
            {...{ href, label }}
          />
        );
      })}

      <div className="divider !my-1" />
      {[{ href: "/bridge", label: "Bridge" }].map(({ href, label }) => (
        <MenuLinkItem
          key={`menu-${href}`}
          active={path === href}
          {...{ href, label }}
        />
      ))}
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
