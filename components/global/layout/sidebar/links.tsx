import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { FaSync } from "react-icons/fa";

import { useTBD } from "hooks/useTBD";

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

interface LayerSwapMenuProps {
  target: string | null;
}

export const Layer1SwapMenu = ({ target }: LayerSwapMenuProps) => {
  return (
    <>
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
    </>
  );
};

export const Layer2SwapMenu = ({ target }: LayerSwapMenuProps) => {
  const { openTBD } = useTBD();

  return (
    <>
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
    </>
  );
};

export const BridgeMenu = () => {
  const path = usePathname();

  return (
    <>
      {[{ href: "/bridge", label: "Bridge" }].map(({ href, label }) => (
        <MenuLinkItem
          key={`menu-${href}`}
          active={path === href}
          {...{ href, label }}
        />
      ))}
    </>
  );
};
