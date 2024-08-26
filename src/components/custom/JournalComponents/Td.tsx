import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

const Td = ({
  children,
  rowSpan,
  className,
  colSpan,
}: PropsWithChildren<{
  colSpan?: number;
  rowSpan?: number;
  className?: string;
}>) => {
  return (
    <td
      className={cn(
        "border border-secondary font-thin outline-none",
        className
      )}
      rowSpan={rowSpan}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};

export default Td;
