import clsx from "clsx";
import { ButtonHTMLAttributes, FormHTMLAttributes } from "react";
import { FaTimes } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const PrimaryButton = ({ label, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx([
        "btn-primary btn-sm btn flex-1 normal-case text-white xs:btn-md",
        props.className,
      ])}
    >
      {label}
    </button>
  );
};

export const SecondaryButton = ({ label, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx([
        "btn-neutral btn-sm btn flex-1 normal-case text-white xs:btn-md",
        props.className,
      ])}
    >
      {label}
    </button>
  );
};

/**
 * Close button
 * @description
 * This is a button that is used to close the dialog.
 */
export const CloseButton = ({
  withIcon,
  children,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  withIcon?: boolean;
}) => {
  return (
    <DialogButtonForm>
      <button value="close" {...props} className="text-black dark:text-white">
        {withIcon ? <FaTimes /> : children}
      </button>
    </DialogButtonForm>
  );
};

/**
 * Form element for dialog buttons
 * @description
 * This is a form element that is used to wrap dialog buttons.
 */
export const DialogButtonForm = ({
  children,
  ...props
}: Omit<FormHTMLAttributes<HTMLFormElement>, "method">) => {
  return (
    <form method="dialog" {...props}>
      {children}
    </form>
  );
};
