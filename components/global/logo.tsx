import Image from "next/image";

import LogoSvg from "public/logo.svg";

export const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-14 w-14">
        <Image src={LogoSvg} alt="logo" />
      </div>
      <div className="flex flex-col">
        <div className="text-2xl font-bold">LBP</div>
        <span className="text-xs">Powered by SCVSOFT</span>
      </div>
    </div>
  );
};
