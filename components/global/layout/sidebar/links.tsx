import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { FaSync, FaArrowRight } from "react-icons/fa";

import { useTBD } from "hooks/useTBD";

interface SwapLinkLabelProps {
  from: string;
  to: string;
  middle: "swap" | "arrow";
}

const IconLinkLabel = ({ from, to, middle }: SwapLinkLabelProps) => {
  return (
    <span className="flex items-center gap-2">
      {from}
      {
        {
          swap: <FaSync />,
          arrow: <FaArrowRight />,
        }[middle]
      }
      {to}
    </span>
  );
};

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

export const AstarNetworkMenu = () => {
  const pair1 = useSearchParams().get("pair1");
  const pair2 = useSearchParams().get("pair2");
  const path = usePathname();

  return (
    <>
      <li className="menu-title">
        <span>Astar Network</span>
      </li>
      {[
        {
          href: "/astar?pair1=eth&pair2=atom",
          label: <IconLinkLabel from="vETH" to="vATOM" middle="swap" />,
        },
        {
          href: "/astar?pair1=eth&pair2=dot",
          label: <IconLinkLabel from="vETH" to="vDOT" middle="swap" />,
        },
        {
          href: "/astar?pair1=atom&pair2=dot",
          label: <IconLinkLabel from="vATOM" to="vDOT" middle="swap" />,
        },
      ].map(({ href, label }) => (
        <MenuLinkItem
          key={`menu-${href}`}
          active={
            !!pair1 && !!pair2 && href.includes(pair1) && href.includes(pair2)
          }
          {...{ href, label }}
        />
      ))}

      <MenuLinkItem
        href="/astar/swap"
        label="Astar Swap"
        active={path === "/astar/swap"}
      />
    </>
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
          label: <IconLinkLabel from="vETH" to="ETH" middle="swap" />,
        },
        {
          href: "/swap/layer1?target=weth",
          label: <IconLinkLabel from="vETH" to="wETH" middle="swap" />,
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
  const pair1 = useSearchParams().get("pair1");
  const pair2 = useSearchParams().get("pair2");

  return (
    <>
      <li className="menu-title">
        <span>Bridge</span>
      </li>
      {[
        {
          href: "/bridge?pair1=eth&pair2=astar",
          label: <IconLinkLabel from="ETH" to="Astar" middle="arrow" />,
        },
        {
          href: "/bridge?pair1=atom&pair2=astar",
          label: <IconLinkLabel from="Cosmos" to="Astar" middle="arrow" />,
        },
        {
          href: "/bridge?pair1=l1eth&pair2=l2eth",
          label: <IconLinkLabel from="ETH L1" to="ETH L2" middle="arrow" />,
        },
      ].map(({ href, label }) => (
        <MenuLinkItem
          key={`menu-${href}`}
          active={
            !!pair1 && !!pair2 && href.includes(pair1) && href.includes(pair2)
          }
          {...{ href, label }}
        />
      ))}
    </>
  );
};
