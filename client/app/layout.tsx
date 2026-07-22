import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QRCevo — QR codes that connect",
  description: "Create, manage, and measure every QR code.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
