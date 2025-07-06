import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Geely Surabaya",
  description: "Ilham Bintang ",
  generator: "ilhambint",
  // --- INI BAGIAN YANG ANDA UBAH ---
  icons: {
    icon: "/logo.svg", // Ini akan membuat <link rel="icon">
    apple: "/logo.svg", // Ini akan membuat <link rel="apple-touch-icon">
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
