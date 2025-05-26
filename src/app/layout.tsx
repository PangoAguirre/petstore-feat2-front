import type { Metadata } from "next";
import "./globals.css";
import NavDash from "@/components/organims/NavDash";
import FooterRights from "@/components/organims/FooterRights";

export const metadata: Metadata = {
  title: "PetStore Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh antialiased flex flex-col justify-between">
        <NavDash title="PetStore" />
        {children}
        <FooterRights />
      </body>
    </html>
  );
}
