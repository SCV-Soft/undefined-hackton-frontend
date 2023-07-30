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
        ABI,
        provider.ETH
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
        provider.ASTR
      ),
      ASTR: new ethers.Contract(
        "0x46744EB617FB56ee2364CD15Db9179C92012cb53",
        ABI,
        provider.ASTR
      ),
    },
  };

  const fetchBalance = async (chain: any, token: any, address: string) => {
    const balance = await chain[token].balanceOf(address);
    return Number(ethers.utils.formatUnits(`${balance || 0}`, 18));
  };

  const promises = [];

  // ETH
  promises.push(
    fetchBalance(contract.ETH, "ETH", addr).then((amount) => {
      return {
        chain: "ETH",
        tokens: [
          {
            name: "Ethereum",
            symbol: "ETH",
            contract: "0xfaCC1871330DB8c7346e7F76514D04857eEEA089",
            amount: amount,
          },
        ],
      };
    })
  );

  // ATOM
  promises.push(
    fetchBalance(contract.ATOM, "ATOM", addr).then((amount) => {
      return {
        chain: "ATOM",
        tokens: [
          {
            name: "Cosmos",
            symbol: "ATOM",
            contract:
              "0xAFc85AbC6DB664dAfF2Dc1007A0428cFCaDb392F".toLowerCase(),
            amount: amount,
          },
        ],
      };
    })
  );

  // ASTR
  promises.push(
    Promise.all([
      fetchBalance(contract.ASTR, "ETH", addr),
      fetchBalance(contract.ASTR, "ATOM", addr),
      fetchBalance(contract.ASTR, "ASTR", addr),
    ]).then(([ethAmount, atomAmount, astrAmount]) => {
      return {
        chain: "ASTR",
        tokens: [
          {
            name: "Ethereum",
            symbol: "ETH",
            contract:
              "0xFF847bef92cdF7587341C7F1c8De03A35F4eE44D".toLowerCase(),
            amount: ethAmount,
          },
          {
            name: "Cosmos",
            symbol: "ATOM",
            contract:
              "0xAFc85AbC6DB664dAfF2Dc1007A0428cFCaDb392F".toLowerCase(),
            amount: atomAmount,
          },
          {
            name: "Astar",
            symbol: "ASTR",
            contract:
              "0x46744EB617FB56ee2364CD15Db9179C92012cb53".toLowerCase(),
            amount: astrAmount,
          },
        ],
      };
    })
  );

  const obj = await Promise.all(promises);

  return NextResponse.json(obj);
}
