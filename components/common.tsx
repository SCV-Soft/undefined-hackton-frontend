import clsx from "clsx";
import { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const Button = ({ label, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx([
        "btn-primary btn-md btn rounded-full text-white",
        props?.className,
      ])}
    >
      {label}
    </button>
  );
};

interface InputProps extends HTMLAttributes<HTMLInputElement> {
  left?: ReactNode;
  right?: ReactNode;
}

export const Input = ({ left, right, ...props }: InputProps) => {
  return (
    <div className="flex items-center rounded-full border-2 border-black/30 px-4 shadow-md">
      {left && <span>{left}</span>}
      <input
        className={clsx([
          "grow appearance-none outline-none",
          "min-w-0 bg-transparent p-2 font-black",
          "placeholder:text-sm placeholder:font-semibold placeholder:text-black/30",
          props?.className,
        ])}
        type="number"
        {...props}
      />
      {right && <span>{right}</span>}
    </div>
  );
};

export const Card = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={clsx([
        "w-[420px] border-2 border-black bg-white p-4",
        className,
      ])}
    >
      {children}
    </div>
  );
};

type HeaderProps = {
  title: ReactNode;
  subtitle: string;
};

export const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <nav className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="font-semibold">{subtitle}</p>
    </nav>
  );
};
