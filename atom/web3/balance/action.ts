import { ethers } from "ethers";
import { atom } from "jotai";

import { WEB3_PROVIDERS } from "../providers/state";
import { SIGNER_INFOS, WEB3_SIGNER } from "../signer/state";

import { L1_VETH, L2_VETH, SCETH } from "./state";

const L1_VETH_ADDRESS = "0xfC6ae96facE347BB6419859C1592825B96224ab0";
const L2_VETH_ADDRESS = "0xe5b1C4Be4289CA511440C1287E0C9E031a3bfe3D";
const SCETH_ADDRESS = "0x153fab4B5E067724B4387713ABfBB6Eb581119d6";

const balanceOfAbi = ["function balanceOf(address) view returns (uint256)"];

export const UPDATE_TOKENS = atom(null, (get, set) => {
  const { address } = get(SIGNER_INFOS);
  const { ethereum, polygon } = get(WEB3_PROVIDERS) ?? {};
  const signer = get(WEB3_SIGNER);

  if (!signer || !ethereum || !polygon) return;

  const l1_veth = new ethers.Contract(L1_VETH_ADDRESS, balanceOfAbi, ethereum);
  const l2_veth = new ethers.Contract(L2_VETH_ADDRESS, balanceOfAbi, polygon);
  const sceth = new ethers.Contract(SCETH_ADDRESS, balanceOfAbi, polygon);

  const l1_veth_balance = l1_veth.balanceOf(address);
  const l2_veth_balance = l2_veth.balanceOf(address);
  const sceth_balance = sceth.balanceOf(address);

  // try two times to get the balance, gap between two times is 1s
  Promise.all([l1_veth_balance, l2_veth_balance, sceth_balance]).then(
    ([l1_veth_balance, l2_veth_balance, sceth_balance]) => {
      set(L1_VETH, ethers.utils.formatEther(l1_veth_balance));
      set(L2_VETH, ethers.utils.formatEther(l2_veth_balance));
      set(SCETH, ethers.utils.formatEther(sceth_balance));
    }
  );

  setTimeout(() => {
    Promise.all([l1_veth_balance, l2_veth_balance, sceth_balance]).then(
      ([l1_veth_balance, l2_veth_balance, sceth_balance]) => {
        set(L1_VETH, ethers.utils.formatEther(l1_veth_balance));
        set(L2_VETH, ethers.utils.formatEther(l2_veth_balance));
        set(SCETH, ethers.utils.formatEther(sceth_balance));
      }
    );
  }, 1000);
});
