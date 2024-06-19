import { cn } from "@/lib/utils";
import Td from "./JournalComponents/Td";
import JournalEntryRow from "./JournalComponents/JournalEntryRow";
import { ChangeEvent, useState } from "react";
import { TransactionData } from "@/lib/types";
import { formatFromMoney, formatMoney } from "@/lib/helpers";
import { Button } from "../ui/button";

// Table Header component
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

type JournalData = {
  id: number;
  description: string;
  debit: number;
  credit: number;
};

const defaultTransaction: TransactionData = {
  id: NaN,
  journalId: NaN,
  amount: 0,
  accountId: NaN,
  isDebit: true,
};

const defaultTransactions: TransactionData[] = [
  {
    id: NaN,
    journalId: NaN,
    amount: 0,
    accountId: NaN,
    isDebit: true,
  },
  {
    id: NaN,
    journalId: NaN,
    amount: 0,
    accountId: NaN,
    isDebit: false,
  },
];

const JournalEntry = () => {
  const [transactionData, setTransactionData] =
    useState<TransactionData[]>(defaultTransactions);
  const [entry, setEntry] = useState<JournalData>({
    id: NaN,
    description: "",
    debit: 0,
    credit: 0,
  });

  // Handle Functions
  const handleAccountChange = (e: string, row: number) => {
    const newTransactionData = transactionData.map((data) => data);
    const transaction = newTransactionData[row];
    transaction.accountId = +e;

    setTransactionData(newTransactionData);
  };

  const handleToggleChange = (row: number) => {
    const newTransactionData = transactionData.map((data) => data);
    const transaction = newTransactionData[row];
    transaction.isDebit = !transaction.isDebit;

    setTransactionData(newTransactionData);
  };

  const handleAmountChange = (
    e: ChangeEvent<HTMLInputElement>,
    row: number
  ) => {
    const newTransactionData = transactionData.map((data) => data);
    const transaction = newTransactionData[row];
    const parsedNumber = formatFromMoney(e.target.value);
    transaction.amount = parsedNumber;

    setTransactionData(newTransactionData);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEntry((prev) => {
      return {
        ...prev,
        description: e.target.value,
      };
    });
  };

  const hanldeAddNewRow = () => {
    const newTransactionData = transactionData.map((data) => data);
    const newRow = defaultTransaction;
    newTransactionData.push({ ...newRow });

    setTransactionData(newTransactionData);
  };

  const handleRemoveLine = () => {
    const newTransactionData = transactionData.map((data) => data);
    if (newTransactionData.length == 2) {
      return alert("Must have at least 2 transaction lines");
    }
    newTransactionData.pop();

    setTransactionData(newTransactionData);
  };

  const totals = transactionData.reduce(
    (acc, row) => {
      if (row.isDebit) {
        return {
          ...acc,
          debit: acc.debit + row.amount,
        };
      } else {
        return {
          ...acc,
          credit: acc.credit + row.amount,
        };
      }
    },
    {
      debit: 0,
      credit: 0,
    }
  );

  return (
    <div>
      <table
        onKeyDown={(e) => {
          if (e.altKey) {
            if (e.code === "KeyN") {
              hanldeAddNewRow();
            } else if (e.code === "KeyD") {
              handleRemoveLine();
            }
          }
        }}
      >
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
            <Td
              rowSpan={transactionData.length + 1}
              className="text-center"
            ></Td>
          </tr>
          {transactionData.map((journalTransaction, key) => {
            return (
              <JournalEntryRow
                key={key}
                data={journalTransaction}
                row={key}
                onAccountChange={handleAccountChange}
                onToggleChange={handleToggleChange}
                onAmountChange={handleAmountChange}
              />
            );
          })}
        </tbody>
        <tfoot>
          <tr className="">
            <Td className="text-right border-t-primary border-t-2 border-b-primary border-b-2 font-semibold">
              Desc:
            </Td>
            <Td className="italic border-t-primary border-t-2 border-b-primary border-b-2 font-semibold">
              <input
                className="h-full w-full bg-transparent py-3 px-2"
                value={entry.description}
                onChange={handleDescriptionChange}
              />
            </Td>
            <Td className="text-center border-t-primary border-t-2 border-b-primary border-b-2 font-semibold">
              {formatMoney(totals.debit)}
            </Td>
            <Td className="text-center border-t-primary border-t-2 border-b-primary border-b-2 font-semibold">
              {formatMoney(totals.credit)}
            </Td>
            <Td className="text-right border-t-primary border-t-2 border-b-primary border-b-2 font-semibold"></Td>
          </tr>
        </tfoot>
      </table>
      <div>
        <Button onClick={hanldeAddNewRow}>Add Line</Button>
        <Button onClick={handleRemoveLine}>Remove Line</Button>
      </div>
    </div>
  );
};

export default JournalEntry;
