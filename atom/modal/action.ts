import { atom } from "jotai";

import { MODAL } from "./state";

export const UPDATE_MODAL = atom(null, (_, set, modal: JSX.Element) => {
  set(MODAL, modal);
});
