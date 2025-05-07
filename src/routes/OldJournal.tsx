import AccountDaySelect from "@/components/custom/AccountDaySelect";
import {
  DoubleEntryRow,
  DoubleEntryTable,
} from "@/components/custom/JournalTable";
import JournalNavBar from "@/components/pageComponents/JournalNavBar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import apiClient from "@/lib/axiosInstance";
import { formatMoney, getAllAccountingDays } from "@/lib/helpers";
import { AccountingDay, AccountTotals, JournalTransaction } from "@/lib/types";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { JournalPDF } from "./JournalPDF";
import { PDFViewer } from "@react-pdf/renderer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { downloadJournalPdf } from "@/lib/pdfUtils";

const OldJournal = () => {
  const [accountingDays, setAccountingDays] = useState<AccountingDay[]>([]);
  const [selectedDate, setSelectedDate] = useState<AccountingDay>();
  const [displayData, setDisplayData] = useState<JournalTransaction[]>([]);
  const [accountTotals, setAccountTotals] = useState<AccountTotals[]>([]);

  // On Startups
  useEffect(() => {
    // Get All the accountisng Days
    getAllAccountingDays().then((data) => {
      if (data) {
        setAccountingDays(data.data);

        // Choose the last accounting day as the prefault
        const lastAccountingDay = data.data[data.data.length - 1];

        setSelectedDate(lastAccountingDay);
      }
    });
  }, []);

  useEffect(() => {
    // Get the totals increase
    const getAccountIncrease = () => {
      const accountsTotalsMap = new Map<
        number,
        { accountName: string; total: number }
      >();

      for (const entry of displayData) {
        for (const row of entry.journalRow) {
          const existing = accountsTotalsMap.get(row.accountId);
          if (existing) {
            existing.total += row.amount;
          } else {
            accountsTotalsMap.set(row.accountId, {
              accountName: row.accountName,
              total: row.amount,
            });
          }
        }
      }

      const accountTotals: AccountTotals[] = Array.from(
        accountsTotalsMap.entries()
      ).map(([accountId, { accountName, total }]) => ({
        accountId,
        accountName,
        total,
      }));

      return accountTotals;
    };

    const array = getAccountIncrease();
    setAccountTotals(array);
  }, [displayData]);

  if (!selectedDate) {
    return <Loader />;
  }

  // Update Account Change
  const handleUpdateChange = (str: string) => {
    const selectedAccountingDay = accountingDays.find((day) => day.id == +str);

    if (selectedAccountingDay) {
      setSelectedDate(selectedAccountingDay);
    }
  };

  // Handle Get Journal
  const handleGetJournal = async () => {
    const response = await apiClient.post("/api/journal/getJournal", {
      id: selectedDate.id,
    });

    const data: JournalTransaction[] = response.data.data;

    setDisplayData(data);
  };

  // Handle Get PDF
  const handleGetPDF = async () => {
    const date = new Date(selectedDate.date).toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });

    downloadJournalPdf(
      accountTotals,
      date,
      displayData,
      `Journal Data ${date}`
    );
  };

  return (
    <div className="w-full max-h-screen overflow-hidden">
      <JournalNavBar />
      <Separator orientation="horizontal" />
      <div className="flex h-full">
        <div className="flex-1 py-4 px-4">
          <h1 className="text-2xl font-bold text-center">
            Accounting Day:{" "}
            {new Date(selectedDate.date).toLocaleDateString("de-DE", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </h1>
          <div className="h-full pb-20 flex justify-center">
            <ScrollArea className="h-full w-full max-w-screen-lg pr-5">
              <DoubleEntryTable>
                {displayData.map((transaction) => {
                  return (
                    <DoubleEntryRow
                      key={transaction.id}
                      transaction={transaction}
                    />
                  );
                })}
              </DoubleEntryTable>
            </ScrollArea>
          </div>
        </div>
        <Separator orientation="vertical" />
        {/* Control Side Bar */}
        <div className="w-fit px-4 flex flex-col gap-4 pt-5 min-w-[15rem]">
          <h1 className="text-center text-2xl font-bold">Controls</h1>
          <AccountDaySelect
            accountingDays={accountingDays}
            selectedDate={selectedDate}
            updateDateChange={handleUpdateChange}
          />
          <Button onClick={handleGetJournal}>Get Journal</Button>
          <Button disabled={selectedDate.isActive} onClick={handleGetPDF}>
            Get PDF
          </Button>
          {/* Account Differences Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Account Name</TableHead>
                <TableHead>Debit</TableHead>
                <TableHead>Credit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accountTotals.map((account) => {
                return (
                  <TableRow key={account.accountId}>
                    <TableCell>{account.accountName}</TableCell>
                    <TableCell>
                      {account.total > 0 && formatMoney(account.total)}
                    </TableCell>
                    <TableCell>
                      {account.total < 0 && formatMoney(account.total)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default OldJournal;
