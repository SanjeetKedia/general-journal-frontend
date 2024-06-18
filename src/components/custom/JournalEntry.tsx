import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import Td from "./JournalComponents/Td";
import JournalEntryRow from "./JournalComponents/JournalEntryRow";

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

const JournalEntry = () => {
  return (
    <table>
      <thead>
        <tr>
          <Th>No</Th>
          <Th className="w-64">Account</Th>
          <Th>Debit</Th>
          <Th>Credit</Th>
          <Th>IsDebit</Th>
        </tr>
      </thead>
      <tbody>
        {/* Journal Id No  */}
        <tr>
          <Td rowSpan={3} className="text-center"></Td>
        </tr>
        <JournalEntryRow />
        {/* <JournalEntryRow /> */}
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
