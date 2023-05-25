import clsx from "clsx";
import { cloneElement, useEffect, useRef } from "react";

import { PrimaryButton } from "./buttons";
import { DialogProps } from "./types";

const DialogButton = ({ button }: Pick<DialogProps, "button">) => {
  return (
    <form method="dialog">
      {button && (
        <section className="flex gap-4 p-4 pt-0">
          {Array.isArray(button) ? (
            button.map((button) => ({ ...button }))
          ) : typeof button === "string" ? (
            <PrimaryButton label={button} />
          ) : (
            { ...button }
          )}
        </section>
      )}
    </form>
  );
};

export const Dialog = ({ init, content, button, options }: DialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  const close = (value?: string) => {
    if (!ref.current) return;
    ref.current.close(value);
  };

  useEffect(() => {
    if (!ref.current) return;
    init(ref.current);
  }, [init]);

  // prevent escape key option
  useEffect(() => {
    const preventEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") e.preventDefault();
    };

    if (options?.escape)
      document.addEventListener("keydown", preventEscape, { capture: true });
    return () =>
      document.removeEventListener("keydown", preventEscape, { capture: true });
  }, [options?.escape]);

  return (
    <dialog
      ref={ref}
      className={clsx({
        "w-[400px] rounded-md p-0 shadow-md": true,
        "backdrop:backdrop-blur-xs": options?.blur,
      })}
    >
      {/* modal content */}
      <section>{cloneElement(content, { close })}</section>
      {/* modal buttons */}
      <DialogButton button={button} />
    </dialog>
  );
};
