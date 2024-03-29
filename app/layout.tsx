import "styles/globals.css";
import "styles/tailwindcss.css";

import { PropsWithChildren } from "react";

import { Configs } from "components/global/config";
import { GlobalLayout } from "components/global/layout";
import { ModalContainer } from "components/global/modal/container";
import { ToastContainer } from "components/global/toast";

export const metadata = {
  title: "LBP Protocol",
  description: "easily bridge your assets use Astar Network ecosystem",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <Configs>
          <GlobalLayout>{children}</GlobalLayout>
        </Configs>
        <ToastContainer />
        <ModalContainer />
      </body>
    </html>
  );
}
