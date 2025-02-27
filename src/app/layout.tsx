import type { Metadata } from "next";
import "./globals.css";
import { satoshi } from "@/fonts";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Cliply",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${satoshi.className} font-medium antialiased bg-white dark:bg-zinc-900`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
