import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export function FlexCol({
  children,
  right,
}: PropsWithChildren & { right?: boolean }) {
  return (
    <div className={cn("flex flex-col", right ? "text-right font-bold" : "")}>
      {children}
    </div>
  );
}
