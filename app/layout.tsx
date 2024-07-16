import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TurnosApp by CodeInk",
  description: "Turnos App by Code Ink Sofware Factory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-main-gradient">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
