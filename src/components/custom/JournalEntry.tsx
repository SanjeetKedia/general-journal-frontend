import Td from "./JournalComponents/Td";
import JournalEntryRow from "./JournalComponents/JournalEntryRow";
import { ChangeEvent, useState } from "react";
import { Account, EntryPost, JournalData, TransactionData } from "@/lib/types";
import { formatFromMoney } from "@/lib/helpers";
import { Button } from "../ui/button";
import {
  defaultJournalData,
  defaultTransaction,
  defaultTransactions,
} from "@/lib/defaults";
import { TFoot, Thead } from "./JournalComponents/TableParts";
import axios from "axios";

const JournalEntry = () => {
  const [transactionData, setTransactionData] =
    useState<TransactionData[]>(defaultTransactions);
  const [entry, setEntry] = useState<JournalData>(defaultJournalData);

  // Helpers
  const getTransaction = (
    row: number
  ): [TransactionData, TransactionData[]] => {
    const newTransactionData = transactionData.map((data) => data);
    const transaction = newTransactionData[row];

    return [transaction, newTransactionData];
  };

  // Handle Functions
  const handleRemarkChange = (
    e: ChangeEvent<HTMLInputElement>,
    row: number
  ) => {
    const [transaction, newTransactionData] = getTransaction(row);
    transaction.remark = e.target.value;

    setTransactionData(newTransactionData);
  };

  const handleAccountChange = (e: string, row: number) => {
    const [transaction, newTransactionData] = getTransaction(row);
    transaction.accountId = +e;

    setTransactionData(newTransactionData);
  };

  const handleToggleChange = (row: number) => {
    const [transaction, newTransactionData] = getTransaction(row);
    transaction.isDebit = !transaction.isDebit;

    setTransactionData(newTransactionData);
  };

  const handleAmountChange = (
    e: ChangeEvent<HTMLInputElement>,
    row: number
  ) => {
    const [transaction, newTransactionData] = getTransaction(row);
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

  const handleSaveNewTransaction = async () => {
    const data: EntryPost = {
      ...entry,
      debit: totals.debit,
      credit: totals.credit,
      transactions: [...transactionData],
      accountingDay: 1,
    };

    console.log(data);

    const response = await axios.post<URL, { success: boolean }>(
      "/api/journal/saveNewEntry",
      data
    );

    console.log(response.success);
  };

  // Running on every render
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

  ////////////////////////////////////////////////////////////
  // To use for testing
  const accounts: Account[] = [
    { id: 1, name: "KPAY" },
    { id: 2, name: "Cash Book" },
  ];
  ////////////////////////////////////////////////////////////

  return (
    <div>
      <table>
        {/* Headers */}
        <Thead />
        {/* Body */}
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
                onRemarkChange={handleRemarkChange}
                accounts={accounts}
              />
            );
          })}
        </tbody>
        {/* Description */}
        <TFoot
          description={entry.description}
          handleDescriptionChange={handleDescriptionChange}
          totals={totals}
        />
      </table>
      {/* Buttons */}
      <div>
        <Button onClick={hanldeAddNewRow}>Add Line</Button>
        <Button onClick={handleRemoveLine}>Remove Line</Button>
        <Button onClick={handleSaveNewTransaction}>Save New Entry</Button>
      </div>
    </div>
  );
};

export default JournalEntry;
