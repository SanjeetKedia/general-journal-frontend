import { cn } from "@/lib/utils";

// Table Header component
export const Th = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  return (
    <th
      className={cn(
        "border-secondary border-2 text-center px-6 py-2",
        className
      )}
    >
      {children}
    </th>
  );
};
