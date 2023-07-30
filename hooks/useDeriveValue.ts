import ky from "ky";
import useSWR from "swr";

import { SupportTokens, VTokens } from "helper/token";

// TODO: add token contract address for pair
const getTokenContract = (token: VTokens | SupportTokens) => {};

interface UseDeriveValueParams {
  pair1: string;
  pair2: string;
  amount: string;
}

type SwapResponse = {
  in: string;
  out: string;
};

export const useDeriveValue = ({
  pair1,
  pair2,
  amount,
}: UseDeriveValueParams) => {
  const { data } = useSWR(
    !!pair1 && !!pair2 && !!amount ? { url: "/swap" } : null,
    ({ url }) => {
      return ky
        .get(url, {
          searchParams: {
            from: pair1,
            to: pair2,
            amount,
          },
        })
        .json<SwapResponse>();
    }
  );

  return data;
};
