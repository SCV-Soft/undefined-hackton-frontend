import { ethers } from "ethers";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  const addr = req.nextUrl.searchParams.get("addr");

  const rpcUrl = {
    ETH: "https://eth-goerli.g.alchemy.com/v2/46XOnps3Xm1toHm9ZDSMO6VugbkDXyOa",
    ATOM: "https://eth.bd.evmos.dev:8545",
    ASTR: "https://evm.shibuya.astar.network/",
  };

  const provider = {
    ETH: new ethers.providers.JsonRpcProvider(rpcUrl.ETH),
    ATOM: new ethers.providers.JsonRpcProvider(rpcUrl.ATOM),
    ASTR: new ethers.providers.JsonRpcProvider(rpcUrl.ASTR),
  };

  const ABI = [
    "function decimals() view returns (uint8)",
    "function balanceOf(address) view returns (uint)",
  ];

  const contract = {
    ETH: {
      ETH: new ethers.Contract(
        "0xfaCC1871330DB8c7346e7F76514D04857eEEA089",
        ABI
      ),
    },
    ATOM: {
      ATOM: new ethers.Contract(
        "0xAFc85AbC6DB664dAfF2Dc1007A0428cFCaDb392F",
        ABI,
        provider.ATOM
      ),
    },
    ASTR: {
      ATOM: new ethers.Contract(
        "0xAFc85AbC6DB664dAfF2Dc1007A0428cFCaDb392F",
        ABI,
        provider.ASTR
      ),
      ETH: new ethers.Contract(
        "0xFF847bef92cdF7587341C7F1c8De03A35F4eE44D",
        ABI,
        provider.ATOM
      ),
      ASTR: new ethers.Contract(
        "0x46744EB617FB56ee2364CD15Db9179C92012cb53",
        ABI,
        provider.ASTR
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
          contract: "0xfaCC1871330DB8c7346e7F76514D04857eEEA089",
          amount: Number(
            ethers.utils.formatUnits(
              `${(await contract.ETH.ETH.balanceOf(addr)) || 0}`,
              18
            )
          ),
        },
      ],
    },
    {
      chain: "ATOM",
      tokens: [
        {
          name: "Cosmos",
          symbol: "ATOM",
          contract: "0xAFc85AbC6DB664dAfF2Dc1007A0428cFCaDb392F".toLowerCase(),
          amount: Number(
            ethers.utils.formatUnits(
              `${(await contract.ATOM.ATOM.balanceOf(addr)) || 0}`,
              18
            )
          ),
        },
      ],
    },
    {
      chain: "ASTR",
      tokens: [
        {
          name: "Ethereum",
          symbol: "ETH",
          contract: "0xFF847bef92cdF7587341C7F1c8De03A35F4eE44D".toLowerCase(),
          amount: Number(
            ethers.utils.formatUnits(
              `${(await contract.ASTR.ETH.balanceOf(addr)) || 0}`,
              18
            )
          ),
        },
        {
          name: "Cosmos",
          symbol: "ATOM",
          contract: "0xAFc85AbC6DB664dAfF2Dc1007A0428cFCaDb392F".toLowerCase(),
          amount: Number(
            ethers.utils.formatUnits(
              `${(await contract.ATOM.ATOM.balanceOf(addr)) || 0}`,
              18
            )
          ),
        },
        {
          name: "Astar",
          symbol: "ASTR",
          contract: "0x46744EB617FB56ee2364CD15Db9179C92012cb53".toLowerCase(),
          amount: Number(
            ethers.utils.formatUnits(
              `${(await contract.ASTR.ASTR.balanceOf(addr)) || 0}`,
              18
            )
          ),
        },
      ],
    },
  ];

  return NextResponse.json(obj);
}
