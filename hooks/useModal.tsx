import { useSetAtom } from "jotai";

import { UPDATE_MODAL } from "atom/modal/action";
import { Dialog } from "components/global/modal";
import { ModalOptions } from "components/global/modal/types";

export const useModal = () => {
  const open = useSetAtom(UPDATE_MODAL);

  const modal = (
    content: JSX.Element,
    button?: string | JSX.Element | JSX.Element[],
    options?: ModalOptions
  ): Promise<string> => {
    return new Promise((resolve) => {
      const key = Math.random().toString(36).slice(-8);

      const init = (dialog: HTMLDialogElement) => {
        if (dialog.open) return;
        dialog.showModal();
        dialog.addEventListener("close", () => resolve(dialog.returnValue), {
          once: true,
        });
      };

      open(<Dialog {...{ init, content, button, options }} key={key} />);
    });
  };

  return { modal };
};
