// app/layout.tsx
import { ReactNode } from "react";
import SessionProvider from "@/app/(components)/ui/SessionProvider";
import Nav from "./(components)/Nav";
import "./globals.css";

interface LayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Nav />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
