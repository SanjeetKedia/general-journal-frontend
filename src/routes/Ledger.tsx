import AccountSelect from "@/components/custom/JournalComponents/AccountSelect";
import JournalTransactionDialog from "@/components/custom/JournalComponents/JournalTransactionDialog";
import { Button } from "@/components/ui/button";
import { CalenderInput } from "@/components/ui/calender-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import apiClient from "@/lib/axiosInstance";
import {
  findAccountName,
  formatMoney,
  getAccounts,
  getStartOfDay,
  getStartOfMonth,
} from "@/lib/helpers";
import { Account, JournalTransaction } from "@/lib/types";
import { Separator } from "@radix-ui/react-separator";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

type DisplayData = {
  balance: number;
  id: number;
  journalId: number;
  amount: number;
  remark: string;
  description: string;
  accountingDay: number;
  date: string | undefined;
};

const Ledger = () => {
  const [accounts, setAccounts] = useState<Account[]>();
  const [accountId, setAccountId] = useState(NaN);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: getStartOfMonth(),
    to: getStartOfDay(),
  });
  const [displayData, setDisplayData] = useState<DisplayData[]>([]);
  const [selectedRow, setSelectedRow] = useState<DisplayData | null>(null);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<JournalTransaction | null>(
    null
  );

  useEffect(() => {
    getAccounts().then((data) => {
      if (data) {
        setAccounts(data);
      }
    });
  }, []);

  // Handle functions
  const handleAccountChange = (e: string) => {
    setAccountId(+e);
  };

  const handleDateChange = (e: DateRange | undefined) => {
    if (!e) return;

    setDateRange(e);
  };

  const handleGetData = async () => {
    if (Number.isNaN(accountId)) {
      return alert("Please choose an account");
    }

    if (!dateRange.to) {
      return alert("Choose proper date range");
    }

    if (!dateRange.from) {
      return alert("Chooser proper date range");
    }

    const queryParams = {
      from: dateRange.from,
      to: dateRange.to,
      accountId: accountId,
    };

    const resp = await apiClient.post(
      "/api/ledger/getTransactions",
      queryParams
    );
    const data: {
      balance: number;
      id: number;
      journalId: number;
      amount: number;
      remark: string;
      description: string;
      accountingDay: number;
      date: string | undefined;
    }[] = resp.data.data;

    setDisplayData(data);
  };

  const handleChangeSelect = (id: number) => {
    const object = displayData.find((row) => row.id == id);

    if (!object) {
      return alert("Error");
    }

    if (!selectedRow) return setSelectedRow(object);
    if (selectedRow.id == id) return setSelectedRow(null);

    setSelectedRow(object);
  };

  const toggleDialog = () => setDialogIsOpen(!dialogIsOpen);

  const closeDialog = () => setDialogIsOpen(false);

  const handleSeeJournalEntry = async () => {
    if (!selectedRow) return alert("Please select a row");

    const response = await apiClient.post("/api/journal/getTransaction", {
      id: selectedRow.id,
    });

    const data: JournalTransaction = response.data.data;

    setDialogContent(data);
    toggleDialog();
  };

  const totals = displayData.reduce(
    (acc, cur) => {
      if (cur.amount >= 0) {
        acc.totalDebit += cur.amount;
      } else {
        acc.totalCredit += cur.amount;
      }
      return acc;
    },
    { totalDebit: 0, totalCredit: 0 }
  );

  return (
    <div className="flex-1 flex">
      {accounts ? (
        <>
          <div className="flex-1 flex flex-col py-3 gap-5 items-center">
            <div className="flex flex-col w-fit mx-auto">
              <p className="mx-auto font-bold text-2xl">
                {findAccountName(accountId, accounts) || "Select an account"}
              </p>
              <Separator className="border w-" />
              <p className="mx-auto font-bold text-xl">
                {dateRange.from?.toDateString()} -{" "}
                {dateRange.from?.toDateString()}
              </p>
            </div>
            <ScrollArea className="h-min px-4 flex-1 w-full max-w-screen-xl">
              {displayData.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center border bg-primary text-primary-foreground font-bold text-xl w-min">
                        Date
                      </TableHead>
                      <TableHead className="text-center border bg-primary text-primary-foreground font-bold text-xl w-3/12">
                        Description
                      </TableHead>
                      <TableHead className="text-center border bg-primary text-primary-foreground font-bold text-xl w-2/12">
                        Remark
                      </TableHead>
                      <TableHead className="text-center border bg-primary text-primary-foreground font-bold text-xl w-2/12">
                        Debit
                      </TableHead>
                      <TableHead className="text-center border bg-primary text-primary-foreground font-bold text-xl w-2/12">
                        Credit
                      </TableHead>
                      <TableHead className="text-center border bg-primary text-primary-foreground font-bold text-xl w-3/12">
                        Balance
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {displayData.length > 0 ? (
                      displayData.map((row) => {
                        return (
                          <TableRow
                            key={row.id}
                            onClick={() => handleChangeSelect(row.id)}
                            className={
                              selectedRow?.id === row.id
                                ? "bg-secondary cursor-pointer"
                                : "cursor-pointer"
                            }
                          >
                            <TableCell className="border">
                              {row.date
                                ? new Date(row.date).toLocaleDateString()
                                : ""}
                            </TableCell>
                            <TableCell className="border">
                              {row.description}
                            </TableCell>
                            <TableCell className="border">
                              {row.remark}
                            </TableCell>
                            <TableCell className="border text-right">
                              {row.amount >= 0 ? formatMoney(row.amount) : ""}
                            </TableCell>
                            <TableCell className="border text-right">
                              {row.amount < 0
                                ? formatMoney(row.amount * -1)
                                : ""}
                            </TableCell>
                            <TableCell className="border text-right">
                              {formatMoney(row.balance)}
                            </TableCell>
                          </TableRow>
                        );
                      })
                    ) : (
                      <TableRow></TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                    <TableRow className="text-xl">
                      <TableCell className="border text-right" colSpan={3}>
                        Totals
                      </TableCell>
                      <TableCell className="border text-right">
                        {formatMoney(totals.totalDebit)}
                      </TableCell>
                      <TableCell className="border text-right">
                        {formatMoney(totals.totalCredit * -1)}
                      </TableCell>
                      <TableCell className="border text-right">
                        {formatMoney(
                          displayData[displayData.length - 1].balance
                        )}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              ) : (
                <></>
              )}
            </ScrollArea>
          </div>
          <Separator orientation="vertical" className="border my-3 rounded" />
          <div className="flex flex-col w-1/12 min-w-fit px-5 py-3 gap-3">
            <AccountSelect
              options={accounts}
              value={accountId}
              onChange={handleAccountChange}
            />
            <CalenderInput date={dateRange} onDateChange={handleDateChange} />
            <Button onClick={handleGetData}>Get Data</Button>

            <Button
              disabled={selectedRow == null}
              onClick={handleSeeJournalEntry}
            >
              View Transaction
            </Button>
            <JournalTransactionDialog
              isOpen={dialogIsOpen}
              closeDialog={closeDialog}
              transactionToShow={dialogContent}
            />
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Ledger;
