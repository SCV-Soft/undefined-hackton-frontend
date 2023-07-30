import { useAtomValue } from "jotai";
import ky from "ky";
import useSWR from "swr";

import { SIGNER_INFOS } from "atom/web3/signer/state";
import { VTokens } from "helper/token";

type TokenAsset = {
  name: string;
  symbol: string;
  contract: string;
  amount: number;
};

type GetAssetsResponse = Array<{
  chain: string;
  tokens: Array<TokenAsset>;
}>;

export const useAssets = (address: string) => {
  const { data: _data, mutate } = useSWR({ url: "/api" }, ({ url }) => {
    return ky
      .get(url, { searchParams: { addr: address } })
      .json<GetAssetsResponse>();
  });

  const data =
    _data?.map(({ tokens }) => {
      const token = tokens?.[0];
      return {
        symbol: token.symbol,
        amount: String(token.amount),
      };
    }) || [];

  return {
    data,
    mutate,
  };
};
