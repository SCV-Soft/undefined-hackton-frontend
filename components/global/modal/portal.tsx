import { useAtomValue } from "jotai";
import { createPortal } from "react-dom";

import { MODAL } from "atom/modal/state";

export const ModalPortal = () => {
  const modal = useAtomValue(MODAL);
  const root =
    typeof window !== "undefined"
      ? document.getElementById("modal-root")
      : null;
  return !root ? null : createPortal(modal, root);
};
