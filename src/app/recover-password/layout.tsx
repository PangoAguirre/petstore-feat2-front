import NavPrueba from "@/components/organims/Navprueba";
import FooterRights from "@/components/organims/FooterRights";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <NavPrueba
        title="Recuperar Contraseña"
        subtitle="Inicio"
        subtitle2="Ayuda"
        subtitle3="Contacto"
      />
      <main>{children}</main>
      <FooterRights />
    </>
  );
}
