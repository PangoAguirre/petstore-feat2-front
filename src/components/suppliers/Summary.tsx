import { Separator } from "../ui/separator";
import { FlexCol } from "../common/FlexCol";
import { SummaryItem } from "./SummaryItem";
import { format } from "date-fns";

export function Summary({ info }: { info: Record<string, string> }) {
  return (
    <ul className="flex flex-col">
      <SummaryItem icon="📝">
        <FlexCol>
          <span className="font-bold">Datos Generales</span>
          <span>Nombre: {info.name}</span>
          <span>NIT: {info.nit}</span>
        </FlexCol>
      </SummaryItem>
      <Separator />
      <SummaryItem icon="📦">
        <FlexCol>
          <span className="font-bold">Productos Asociados</span>
          <span>{info.products.length} Productos agregados</span>
        </FlexCol>
        <FlexCol right>
          <span>Ver detalles</span>
        </FlexCol>
      </SummaryItem>
      <Separator />
      <SummaryItem icon="📞">
        <FlexCol>
          <span className="font-bold">Información de Contacto</span>
          <span>Teléfono: {info.phone}</span>
          <span>Email: {info.email}</span>
        </FlexCol>
        <FlexCol right>
          <span>Dirección: {info.address}</span>
        </FlexCol>
      </SummaryItem>
      <Separator />
      <SummaryItem icon="💳">
        <FlexCol>
          <span className="font-bold">Condiciones de Pago</span>
          <span>Fecha de inicio: {format(info.startDate, "PPP")}</span>
          <span>Fecha límite: {format(info.endDate, "PPP")}</span>
        </FlexCol>
        <FlexCol right>
          <span>Días crédito: {info.creditDays}</span>
        </FlexCol>
      </SummaryItem>
    </ul>
  );
}
