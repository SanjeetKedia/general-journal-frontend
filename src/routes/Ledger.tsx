import AccountSelect from "@/components/custom/JournalComponents/AccountSelect";
import { Button } from "@/components/ui/button";
import { CalenderInput } from "@/components/ui/calender-input";
import {
  Table,
  TableBody,
  TableCell,
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
} from "@/lib/helpers";
import { Account } from "@/lib/types";
import { Separator } from "@radix-ui/react-separator";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

const Ledger = () => {
  const [accounts, setAccounts] = useState<Account[]>();
  const [accountId, setAccountId] = useState(NaN);
  const [dateRange, setDateRange] = useState<DateRange>({
    from: getStartOfDay(),
    to: getStartOfDay(),
  });
  const [displayData, setDisplayData] = useState<
    {
      balance: number;
      id: number;
      journalId: number;
      amount: number;
      remark: string;
      description: string;
      accountingDay: number;
      date: string | undefined;
    }[]
  >([]);

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

    console.log(e.from, e.to);

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

  return (
    <div className="flex-1 flex">
      {accounts ? (
        <>
          <div className="flex-1 flex flex-col py-3 gap-5">
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center border bg-primary text-black font-bold text-xl">
                    Date
                  </TableHead>
                  <TableHead className="text-center border bg-primary text-black font-bold text-xl">
                    Description
                  </TableHead>
                  <TableHead className="text-center border bg-primary text-black font-bold text-xl">
                    Remark
                  </TableHead>
                  <TableHead className="text-center border bg-primary text-black font-bold text-xl">
                    In
                  </TableHead>
                  <TableHead className="text-center border bg-primary text-black font-bold text-xl">
                    Out
                  </TableHead>
                  <TableHead className="text-center border bg-primary text-black font-bold text-xl">
                    Balance
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayData.length > 0 ? (
                  displayData.map((row) => {
                    return (
                      <TableRow key={row.id}>
                        <TableCell className="border">
                          {row.date
                            ? new Date(row.date).toLocaleDateString()
                            : ""}
                        </TableCell>
                        <TableCell className="border">
                          {row.description}
                        </TableCell>
                        <TableCell className="border">{row.remark}</TableCell>
                        <TableCell className="border text-right">
                          {row.amount >= 0 ? formatMoney(row.amount) : ""}
                        </TableCell>
                        <TableCell className="border text-right">
                          {row.amount < 0 ? formatMoney(row.amount) : ""}
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
            </Table>
          </div>
          <Separator orientation="vertical" className="border my-3 rounded" />
          <div className="flex flex-col w-1/12 min-w-fit px-5 py-3 gap-3">
            <AccountSelect
              options={accounts}
              value={findAccountName(accountId, accounts)}
              onChange={handleAccountChange}
            />
            <CalenderInput date={dateRange} onDateChange={handleDateChange} />
            <Button onClick={handleGetData}>Get Data</Button>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default Ledger;
