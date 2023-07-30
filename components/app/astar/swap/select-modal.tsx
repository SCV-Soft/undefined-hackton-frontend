import Image from "next/image";
import { FaTimes } from "react-icons/fa";

import { DialogButtonForm } from "components/global/modal/buttons";
import { SupportTokens } from "helper/token";
import { getTokenImage } from "helper/token/images";

interface TokenListItemProps {
  symbol: string;
  name: string;
  onClick: (token: SupportTokens) => void;
}

const TokenListItem = ({ symbol, name, onClick }: TokenListItemProps) => {
  const token = SupportTokens[symbol as keyof typeof SupportTokens];

  return (
    <li className="px-4 transition-colors hover:bg-black/10">
      <form method="dialog">
        <button
          type="submit"
          className="flex w-full items-center gap-2 text-left"
          onClick={() => onClick(token)}
        >
          <Image src={getTokenImage(token)} alt={`${symbol} logo`} />
          <div className="flex flex-col p-2 font-semibold">
            <span className="text-black/70">{symbol?.toUpperCase()}</span>
            <span className="text-sm text-black/30">{name}</span>
          </div>
        </button>
      </form>
    </li>
  );
};

interface SwapSelectModalProps {
  onSelectToken: (token: SupportTokens) => void;
}

export const SwapSelectModal = ({ onSelectToken }: SwapSelectModalProps) => {
  // make token list by support tokens enum

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <h1 className="text-lg font-medium text-gray-600">Select a Token</h1>
        <DialogButtonForm>
          <button type="submit" className="text-lg text-black/70">
            <FaTimes />
          </button>
        </DialogButtonForm>
      </div>
      <div className="divider !m-0 !h-0 before:bg-gray-200 after:bg-gray-200" />
      <ul className="py-2">
        {Object.entries(SupportTokens).map(([symbol, name]) => (
          <TokenListItem
            key={`${symbol}-${name}`}
            {...{ symbol, name }}
            onClick={onSelectToken}
          />
        ))}
      </ul>
    </div>
  );
};
