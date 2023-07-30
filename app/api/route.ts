import { ethers } from "ethers";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  const addr = req.nextUrl.searchParams.get("addr");

  const rpcUrl = {
    ETH: "https://eth-goerli.g.alchemy.com/v2/46XOnps3Xm1toHm9ZDSMO6VugbkDXyOa",
    ATOM: "https://eth.bd.evmos.dev:8545",
    ASTAR: "https://evm.shibuya.astar.network/",
  };

  const provider = {
    ETH: new ethers.providers.JsonRpcProvider(rpcUrl.ETH),
    ATOM: new ethers.providers.JsonRpcProvider(rpcUrl.ATOM),
    ASTAR: new ethers.providers.JsonRpcProvider(rpcUrl.ASTAR),
  };

  const ABI = [
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint)",
  ];

  const contract = {
    ETH: {},
    ATOM: {
      ETH: new ethers.Contract(
        "0xAFc85AbC6DB664dAfF2Dc1007A0428cFCaDb392F",
        ABI,
        provider.ATOM
      ),
    },
    ASTAR: {
      ETH: new ethers.Contract(
        "0xAFc85AbC6DB664dAfF2Dc1007A0428cFCaDb392F",
        ABI,
        provider.ASTAR
      ),
    },
  };

  const obj = [
    {
      chain: "ETH",
      tokens: [
        {
          name: "Ethereum",
          symbol: "ETH",
          contract: "",
        },
      ],
    },
    {
      chain: "ATOM",
      tokens: [
        {
          name: "Ethereum",
          symbol: "ETH",
          contract: "0xAFc85AbC6DB664dAfF2Dc1007A0428cFCaDb392F".toLowerCase(),
          amount: Number(
            ethers.utils.formatUnits(
              `${(await contract.ATOM.ETH.balanceOf(addr)) || 0}`,
              18
            )
          ),
        },
      ],
    },
    {
      chain: "ASTAR",
      tokens: [
        {
          name: "Ethereum",
          symbol: "ETH",
          contract: "0xAFc85AbC6DB664dAfF2Dc1007A0428cFCaDb392F".toLowerCase(),
          amount: Number(
            ethers.utils.formatUnits(
              `${(await contract.ASTAR.ETH.balanceOf(addr)) || 0}`,
              18
            )
          ),
        },
      ],
    },
  ];

  return NextResponse.json(obj);
}
