import type { Metadata } from "next";
import "./globals.css";

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
      <body className="h-dvh antialiased">{children}</body>
    </html>
  );
}
