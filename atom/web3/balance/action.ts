import { ethers } from "ethers";
import { atom } from "jotai";

import { WEB3_PROVIDERS } from "../providers/state";
import { SIGNER_INFOS, WEB3_SIGNER } from "../signer/state";

import { L1_VETH, L2_VETH, SCETH } from "./state";

const L1_VETH_ADDRESS = "0xfaCC1871330DB8c7346e7F76514D04857eEEA089";
const L2_VETH_ADDRESS = "0xFF847bef92cdF7587341C7F1c8De03A35F4eE44D";
const SCETH_ADDRESS = "0x485904f09Fec2e758FaF544893989a8d17cbd8Bc";

const balanceOfAbi = ["function balanceOf(address) view returns (uint256)"];

export const UPDATE_TOKENS = atom(null, async (get, set) => {
  const { address } = get(SIGNER_INFOS);
  const { ethereum, astar } = get(WEB3_PROVIDERS) ?? {};
  const signer = get(WEB3_SIGNER);

  if (!signer || !ethereum || !astar) return;

  const l1_veth = new ethers.Contract(L1_VETH_ADDRESS, balanceOfAbi, ethereum);
  const l2_veth = new ethers.Contract(L2_VETH_ADDRESS, balanceOfAbi, astar);
  const sceth = new ethers.Contract(SCETH_ADDRESS, balanceOfAbi, astar);

  const [l1_veth_balance, l2_veth_balance, sceth_balance] = await Promise.all([
    l1_veth.balanceOf(address),
    l2_veth.balanceOf(address),
    sceth.balanceOf(address),
  ]);

  set(L1_VETH, ethers.utils.formatEther(l1_veth_balance));
  set(L2_VETH, ethers.utils.formatEther(l2_veth_balance));
  set(SCETH, ethers.utils.formatEther(sceth_balance));
});
