import NavDash from "@/components/organims/NavDash";
import FooterRights from "@/components/organims/FooterRights";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <NavDash title="PetStore - Administración" />
      <main>{children}</main>
      <FooterRights />
    </>
  );
}
