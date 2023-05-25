import { ToastContainer } from "@/components/global/toast";
import { PropsWithChildren } from "react";
import "@styles/global.css";
import "@styles/tailwindcss.css";

export const metadata = {
  title: "Layer Bridge Protocol",
  description: "easily bridge your lsd tokens to other chains",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>{children}</body>
      <ToastContainer />
    </html>
  );
}
