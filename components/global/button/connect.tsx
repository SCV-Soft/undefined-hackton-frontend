import { ethers } from "ethers";
import { useSetAtom } from "jotai";
import { ButtonHTMLAttributes } from "react";
import { toast } from "react-toastify";

import {
  UPDATE_SIGNER_INFOS,
  UPDATE_WEB3_SIGNER,
} from "atom/web3/signer/action";
import { Button } from "components/common";

declare global {
  interface Window {
    ethereum: any;
  }
}

export const ConnectButton = ({
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const setSigner = useSetAtom(UPDATE_WEB3_SIGNER);
  const setSignerInfos = useSetAtom(UPDATE_SIGNER_INFOS);

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });

        const signer = new ethers.providers.Web3Provider(
          window.ethereum
        ).getSigner();

        const address = await signer.getAddress();

        setSigner(signer);
        setSignerInfos({ address });

        toast.success("Wallet connected");
      } catch (error) {
        toast.error("User denied account access");
      }
    } else {
      toast.error("MetaMask not installed");
    }
  };

  return <Button onClick={connectMetaMask} {...props} label="Connect Wallet" />;
};
