import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { InfoIcon } from "lucide-react";
import { Providers } from "@/lib/Providers";

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
        <Providers>
          <div className="min-h-full flex flex-col justify-between ">
            {children}
          </div>
          <Toaster
            icons={{
              error: (
                <InfoIcon className="fill-red-600 text-toaster-foreground" />
              ),
            }}
            toastOptions={{
              classNames: {
                toast:
                  "!bg-toaster !text-toaster-foreground !p-10 !rounded-[40px]",
                icon: "!mr-4",
                title: "!font-bold !text-lg",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
