import ky from "ky";
import { useEffect } from "react";
import useSWR from "swr";

import { useDebounce } from "./useDebounce";

import { SupportTokens, VTokens } from "helper/token";

export const getTokenContract = (token: VTokens | SupportTokens) => {
  switch (token) {
    case VTokens.VETH:
      return "0xFF847bef92cdF7587341C7F1c8De03A35F4eE44D";
    case VTokens.VATOM:
      return "0xAFc85AbC6DB664dAfF2Dc1007A0428cFCaDb392F";
    case VTokens.VDOT:
      return "";
    case SupportTokens.Astr:
      return "0x46744EB617FB56ee2364CD15Db9179C92012cb53";
    default:
      return "";
  }
};

interface UseDeriveValueParams {
  pair1: VTokens | SupportTokens;
  pair2: VTokens | SupportTokens;
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
  const debouncedAmount = useDebounce(amount, 500);

  const { data, mutate } = useSWR(
    !!pair1 && !!pair2 && !!debouncedAmount ? { url: "/api/swap" } : null,
    ({ url }) => {
      return ky
        .get(url, {
          searchParams: {
            from: getTokenContract(pair1),
            to: getTokenContract(pair2),
            amount: debouncedAmount,
          },
        })
        .json<SwapResponse>();
    }
  );

  useEffect(() => {
    mutate();
  }, [debouncedAmount, mutate]);

  return data;
};
