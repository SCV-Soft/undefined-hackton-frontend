import { ethers } from "ethers";
import { NextResponse } from "next/server";

export async function GET(req: any) {
  const from = req.nextUrl.searchParams.get("from");
  const to = req.nextUrl.searchParams.get("to");
  const value = req.nextUrl.searchParams.get("amount");

  const rpcUrl = "https://evm.shibuya.astar.network/";
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

  const abi = [
    "function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)",
  ];
  const addr = "0xD28D77DaB1af0334c130AAAd09525e3762B2D50d"; // router v2
  const contract = new ethers.Contract(addr, abi, provider);

  const amount = ethers.utils.parseUnits(String(value || 0), 18);
  const amountOut = await contract.getAmountsOut(amount, [from, to]);

  const obj = {
    in: ethers.utils.formatUnits(amountOut[0], 18),
    out: ethers.utils.formatUnits(amountOut[1], 18),
  };

  return NextResponse.json(obj);
}
