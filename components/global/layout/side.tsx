"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSync } from "react-icons/fa";

import { Logo } from "../logo";

export const Menu = () => {
  const openTBD = () => {};

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
      ].map(({ href, label }) => {
        return (
          <li key={`menu-${href}`}>
            <Link
              href={href}
              className={clsx([
                href.split("target=")[1] === target
                  ? "font-bold text-black"
                  : "text-black/40",
              ])}
            >
              {label}
            </Link>
          </li>
        );
      })}
      <div className="divider !my-1" />
      <li className="menu-title">
        <span>Layer 2 Swap</span>
      </li>
      {[
        { href: "/swap/layer2?target=matic", label: "Polygon (Matic)" },
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
          <li key={`menu-${label}`}>
            <Link
              className={clsx([
                href.split("target=")[1] === target
                  ? "font-bold text-black/80"
                  : "text-black/40",
              ])}
              href={href}
            >
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
      <div className="divider !my-1" />
      {[
        { href: "/bridge", label: "Bridge" },
        { href: "/dashboard", label: "Dashboard" },
      ].map(({ href, label }) => (
        <li key={href}>
          <Link
            className={clsx([
              path === href ? "font-bold text-black/80" : "text-black/40",
            ])}
            href={href}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const Side = () => {
  return (
    <aside className="h-screen px-10 py-8 shadow-xl">
      <Logo />
      <div className="py-8">
        <Menu />
      </div>
    </aside>
  );
};
