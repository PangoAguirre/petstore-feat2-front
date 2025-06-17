import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function StepScreen({
  show,
  children,
  ...props
}: React.PropsWithChildren & { show: boolean }) {
  return show ? (
    <motion.div
      initial={{ opacity: 0, x: "10%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", duration: 0.8, bounce: 0.4 }}
      className={cn("flex flex-col grow items-center gap-12")}
      {...props}
    >
      {children}
    </motion.div>
  ) : null;
}
