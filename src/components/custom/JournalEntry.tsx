import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

const Th = ({
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
      className={cn("border border-secondary px-2 py-2 font-thin", className)}
      rowSpan={rowSpan}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};

const JournalEntry = () => {
  return (
    <table>
      <thead>
        <tr>
          <Th>No</Th>
          <Th className="w-64">Account</Th>
          <Th>Debit</Th>
          <Th>Credit</Th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <Td rowSpan={3} className="text-center"></Td>
        </tr>
        <tr>
          <Td>Cash Book</Td>
          <Td className="text-right">500,000</Td>
          <Td></Td>
        </tr>
        <tr>
          <Td>Expense</Td>
          <Td></Td>
          <Td className="text-right">500,000</Td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <Td className="text-right border-t-primary border-t-2 border-b-primary border-b-2 font-semibold">
            Desc:
          </Td>
          <Td className="italic border-t-primary border-t-2 border-b-primary border-b-2 font-semibold">
            Vr-500: ၀င်
          </Td>
          <Td className="text-center border-t-primary border-t-2 border-b-primary border-b-2 font-semibold">
            500,000
          </Td>
          <Td className="text-center border-t-primary border-t-2 border-b-primary border-b-2 font-semibold">
            500,000
          </Td>
        </tr>
      </tfoot>
    </table>
  );
};

export default JournalEntry;
