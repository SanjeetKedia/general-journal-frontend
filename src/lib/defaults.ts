import { JournalData, TransactionData } from "./types";

export const defaultTransaction: TransactionData = {
  id: NaN,
  journalId: NaN,
  amount: 0,
  accountId: NaN,
  isDebit: true,
  remark: "",
};

export const defaultTransactions = (): TransactionData[] => [
  {
    ...defaultTransaction,
  },
  { ...defaultTransaction, isDebit: false },
];

export const defaultJournalData: JournalData = {
  id: NaN,
  description: "",
  debit: 0,
  credit: 0,
};
