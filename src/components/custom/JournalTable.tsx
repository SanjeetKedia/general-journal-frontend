import { PropsWithChildren } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { cn } from "@/lib/utils";
import { JournalTransaction } from "@/lib/types";
import { formatMoney } from "@/lib/helpers";

export const DoubleEntryTable = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const Thead = ({
    className,
    children,
  }: PropsWithChildren<{
    className?: string;
  }>) => {
    return (
      <TableHead
        className={cn(
          "bg-primary text-primary-foreground text-xl font-bold text-center border",
          className
        )}
      >
        {children}
      </TableHead>
    );
  };

  return (
    <Table className={cn("mt-4 min-w-fit", className)}>
      <TableHeader>
        <TableRow>
          <Thead className="w-fit">ID</Thead>
          <Thead className="w-1/4">Description</Thead>
          <Thead className="w-1/4">Remark</Thead>
          <Thead className="w-1/5">Debit</Thead>
          <Thead className="w-1/5">Credit</Thead>
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
};

export const DoubleEntryRow = ({
  transaction,
}: {
  transaction: JournalTransaction;
}) => {
  const total = transaction.journalRow.reduce((acc, cur) => {
    if (cur.amount > 0) {
      return acc + cur.amount;
    } else {
      return acc;
    }
  }, 0);

  return (
    <>
      <TableRow>
        <TableCell
          className="border text-center text-xl"
          rowSpan={transaction.journalRow.length + 1}
        >
          {transaction.id}
        </TableCell>
      </TableRow>
      {transaction.journalRow.map((row) => {
        return (
          <TableRow key={row.id}>
            <TableCell className="border">{row.accountName}</TableCell>
            <TableCell className="border">{row.remark}</TableCell>
            <TableCell className="border text-right">
              {row.amount >= 0 ? formatMoney(row.amount) : ""}
            </TableCell>
            <TableCell className="border text-right">
              {row.amount < 0 ? formatMoney(row.amount * -1) : ""}
            </TableCell>
          </TableRow>
        );
      })}
      <TableRow>
        <TableCell className="border bg-secondary text-xl border-r">
          Desc:
        </TableCell>
        <TableCell className="border bg-secondary text-xl" colSpan={2}>
          {transaction.description}
        </TableCell>
        <TableCell className="border bg-secondary text-xl text-center">
          {formatMoney(total)}
        </TableCell>
        <TableCell className="border bg-secondary text-xl text-center">
          {formatMoney(total)}
        </TableCell>
      </TableRow>
    </>
  );
};
