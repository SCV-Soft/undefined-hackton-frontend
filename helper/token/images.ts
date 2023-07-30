import { SupportTokens, VTokens } from ".";

import AcalaIcon from "public/icon/aca.svg";
import AstarIcon from "public/icon/astr.svg";
import AUSDIcon from "public/icon/ausd.svg";
import PolkadotIcon from "public/icon/dot.svg";
import GlimmerIcon from "public/icon/glmr.svg";
import InterBTCIcon from "public/icon/ibtc.svg";
import INTRIcon from "public/icon/intr.svg";
import LiquidDotIcon from "public/icon/ldot.svg";
import TetherIcon from "public/icon/usdt.svg";
import VATOM from "public/icon/vatom.svg";
import VDOT from "public/icon/vdot.svg";
import VETH from "public/icon/veth.svg";

export const getVTokenImage = (token: VTokens) => {
  switch (token) {
    case VTokens.VETH:
      return VETH;
    case VTokens.VATOM:
      return VATOM;
    case VTokens.VDOT:
      return VDOT;
    default:
      return null;
  }
};

export const getTokenImage = (token: SupportTokens) => {
  switch (token) {
    case SupportTokens.Astr:
      return AstarIcon;
    case SupportTokens.Dot:
      return PolkadotIcon;
    case SupportTokens.Aca:
      return AcalaIcon;
    case SupportTokens.Ldot:
      return LiquidDotIcon;
    case SupportTokens.Ausd:
      return AUSDIcon;
    case SupportTokens.Glmr:
      return GlimmerIcon;
    case SupportTokens.Usdt:
      return TetherIcon;
    case SupportTokens.Ibtc:
      return InterBTCIcon;
    case SupportTokens.Intr:
      return INTRIcon;
    default:
      return null;
  }
};
