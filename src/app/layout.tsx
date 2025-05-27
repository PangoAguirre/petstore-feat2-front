import type { Metadata } from "next";
import "./globals.css";
import NavDash from "@/components/organims/NavDash";
import FooterRights from "@/components/organims/FooterRights";
import { ApolloProvWrap } from "@/lib/graphql/Provider";

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
      <body className="h-dvh antialiased">
        <ApolloProvWrap>
          <NavDash title="PetStore " />
          {children}
          <FooterRights />
        </ApolloProvWrap>
      </body>
    </html>
  );
}
