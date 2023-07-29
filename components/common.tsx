import { generateAvatarURL } from "@cfx-kit/wallet-avatar";
import clsx from "clsx";
import Image from "next/image";
import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  left?: ReactNode;
  right?: ReactNode;
}

export const Input = ({ left, right, ...props }: InputProps) => {
  return (
    <div className="flex h-12 items-center rounded-full border-2 border-black/30 px-4 shadow-md">
      {left && <span>{left}</span>}
      <input
        className={clsx([
          "grow appearance-none outline-none",
          "min-w-0 bg-transparent px-2 font-black",
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
        "w-[470px] rounded bg-white px-4 py-6 shadow-lg",
        className,
      ])}
    >
      {children}
    </div>
  );
};

interface InfosProps {
  data: [string, string][];
}

export const Infos = ({ data }: InfosProps) => {
  return (
    <div className="flex flex-col gap-1">
      {data.map(([title, value]) => {
        return (
          <dl
            key={`info-${title}-${value}`}
            className="flex justify-between text-sm font-medium"
          >
            <dt className="text-black/50">{title}</dt>
            <dd className="text-black/80">{value}</dd>
          </dl>
        );
      })}
    </div>
  );
};

interface MyInfosProps {
  baseSymbol: string;
  available: string;
  address: string;
}

export const MyInfos = ({ baseSymbol, available, address }: MyInfosProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <h1 className="font-medium text-black/50">Available to Swap</h1>
        <p className="text-2xl font-semibold">
          {available.length > 10 ? available.slice(0, 10) + "..." : available}{" "}
          {baseSymbol}
        </p>
      </div>
      <div className="flex items-center rounded-full bg-stone-600">
        <Image
          className="rounded-full"
          src={generateAvatarURL(address)}
          width={24}
          height={24}
          alt="jazzicon"
        />
        <span className="pl-2 pr-3 text-xs font-semibold text-white">
          {address.slice(0, 6)}...{address.slice(-6)}
        </span>
      </div>
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
