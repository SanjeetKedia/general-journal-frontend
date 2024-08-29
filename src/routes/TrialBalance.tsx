import AccountDaySelect from "@/components/custom/AccountDaySelect";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
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
import { formatMoney, getAllAccountingDays } from "@/lib/helpers";
import { AccountingDay, BackendResponse } from "@/lib/types";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

type DisplayData = { name: string; total: number };

const TrialBalance = () => {
  const [selectedDate, setSelectedDate] = useState<AccountingDay>();
  const [accountingDays, setAccountingDays] = useState<AccountingDay[]>();
  const [displayData, setDisplayData] = useState<DisplayData[]>([]);

  // On Startups
  useEffect(() => {
    // Get All the accounting Days
    getAllAccountingDays().then((data) => {
      if (data) {
        setAccountingDays(data.data);

        // Choose the last accounting day as the prefault
        const lastAccountingDay = data.data[data.data.length - 1];

        setSelectedDate(lastAccountingDay);
      }
    });
  }, []);

  // If error Loading Screen
  if (!accountingDays || !selectedDate) {
    return <Loader />;
  }

  // State functions
  const handleUpdateDateChange = (value: string) => {
    const selectedAccountingDay = accountingDays.find(
      (day) => day.id == +value
    );

    if (selectedAccountingDay) {
      setSelectedDate(selectedAccountingDay);
    }
  };

  const handleGetTrialBalance = async () => {
    const response = await apiClient.post<BackendResponse<DisplayData[]>>(
      "/api/trialBalance/getTrialBalance",
      {
        date: selectedDate.date,
      }
    );
    if (!response) {
      return console.log(`Error`);
    }

    const data = response.data.data;

    setDisplayData(data);
  };

  const totals = displayData.reduce(
    (acc, cur) => {
      if (cur.total >= 0) {
        acc.debit += cur.total;
      } else {
        acc.credit += cur.total;
      }

      return acc;
    },
    { debit: 0, credit: 0 }
  );

  return (
    <div className="flex flex-1 max-h-screen overflow-hidden">
      {/* Content Display */}
      <div className="min-w-[75%] flex-1 pt-5 flex flex-col items-center gap-5">
        <h1 className="text-center font-bold text-4xl">
          Trial Balance at date -{" "}
          <span className="text-primary">
            {new Date(selectedDate.date).toLocaleDateString()}
          </span>
        </h1>
        <div className="w-fit overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-primary text-primary-foreground border text-center min-w-96 font-bold text-xl">
                  Account Name
                </TableHead>
                <TableHead className="bg-primary text-primary-foreground border text-center min-w-40 font-bold text-xl">
                  Debit
                </TableHead>
                <TableHead className="bg-primary text-primary-foreground border text-center min-w-40 font-bold text-xl">
                  Credit
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayData.map((data, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell className="border">{data.name}</TableCell>
                    <TableCell className="text-right border">
                      {data.total >= 0 ? formatMoney(data.total) : ""}
                    </TableCell>
                    <TableCell className="text-right border">
                      {data.total < 0 ? formatMoney(data.total) : ""}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="text-xl">SUM</TableCell>
                <TableCell className="text-center text-xl">
                  {formatMoney(totals.debit)}
                </TableCell>
                <TableCell className="text-center text-xl">
                  {formatMoney(totals.credit * -1)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
      <Separator orientation="vertical" />
      {/* Controls */}
      <div className="w-fit px-4 flex flex-col gap-4 pt-5 min-w-[15rem]">
        <h1 className="text-center text-2xl font-bold">Controls</h1>
        <AccountDaySelect
          accountingDays={accountingDays}
          selectedDate={selectedDate}
          updateDateChange={handleUpdateDateChange}
        />
        <Button onClick={handleGetTrialBalance}>Get Trial Balance</Button>
      </div>
    </div>
  );
};

export default TrialBalance;
