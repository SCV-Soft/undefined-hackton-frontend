export enum VTokens {
  VATOM = "vATOM",
  VDOT = "vDOT",
  VETH = "vETH",
}

export enum SupportTokens {
  Astr = "Astar",
  Dot = "Polkadot",
  Aca = "Acala",
  Ldot = "Liquid Dot",
  Ausd = "Acala Dollar",
  Glmr = "Glimmer",
  Usdt = "Tether USD",
  Ibtc = "InterBTC",
  Intr = "INTR",
}

export const getTokenName = (token: SupportTokens) => {
  switch (token) {
    case SupportTokens.Astr:
      return "Astar";
  }
};

export const getTokenSymbol = (token: SupportTokens) => {
  switch (token) {
    case SupportTokens.Astr:
      return "ASTR";
    case SupportTokens.Dot:
      return "DOT";
    case SupportTokens.Aca:
      return "ACA";
    case SupportTokens.Ldot:
      return "LDOT";
    case SupportTokens.Ausd:
      return "AUSD";
    case SupportTokens.Glmr:
      return "GLMR";
    case SupportTokens.Usdt:
      return "USDT";
    case SupportTokens.Ibtc:
      return "IBTC";
    case SupportTokens.Intr:
      return "INTR";
    default:
      return "";
  }
};
