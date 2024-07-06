export type TransactionData = {
  id: number;
  journalId: number;
  amount: number;
  accountId: number;
  isDebit: boolean;
  remark: string;
};

export type JournalData = {
  id: number;
  description: string;
  debit: number;
  credit: number;
};

export type Account = {
  id: number;
  name: string;
  type: string;
  description: string;
};

export type EntryPost = {
  accountingDay: number;
  id: number;
  description: string;
  debit: number;
  credit: number;
  transactions: {
    id: number;
    journalId: number;
    amount: number;
    accountId: number;
    isDebit: boolean;
    remark: string;
  }[];
};

export type AccountingDay = {
  id: number;
  date: string;
  isActive: boolean;
};
