import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Geely Surabaya",
  description: "Ilham Bintang ",
  generator: "ilhambint",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
