// modal content props
// close is a function that closes the modal.
export interface DialogContentProps {
  close?: (value?: string) => void;
}

export type ModalOptions = {
  blur?: boolean;
  escape?: boolean;
};

export type DialogProps = {
  init: (node: HTMLDialogElement) => void;
  content: JSX.Element;
  button?: string | JSX.Element | JSX.Element[];
  options?: ModalOptions;
};
