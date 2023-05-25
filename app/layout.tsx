import "styles/globals.css";
import "styles/tailwindcss.css";

import { PropsWithChildren } from "react";

import { GlobalLayout } from "components/global/layout";
import { ModalContainer } from "components/global/modal/container";
import { ToastContainer } from "components/global/toast";

export const metadata = {
  title: "Layer Bridge Protocol",
  description: "easily bridge your lsd tokens to other chains",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <GlobalLayout>{children}</GlobalLayout>
        <ToastContainer />
        <ModalContainer />
      </body>
    </html>
  );
}
