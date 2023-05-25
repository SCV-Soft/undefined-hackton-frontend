import "styles/globals.css";
import "styles/tailwindcss.css";

import { PropsWithChildren } from "react";

import { ToastContainer } from "components/global/toast";

export const metadata = {
  title: "Layer Bridge Protocol",
  description: "easily bridge your lsd tokens to other chains",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
