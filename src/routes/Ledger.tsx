import AccountSelect from "@/components/custom/JournalComponents/AccountSelect";
import { Button } from "@/components/ui/button";
import { CalenderInput } from "@/components/ui/calender-input";
import { findAccountName, getAccounts } from "@/lib/helpers";
import { Account } from "@/lib/types";
import { Separator } from "@radix-ui/react-separator";
import axios from "axios";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

const Ledger = () => {
  const [accounts, setAccounts] = useState<Account[]>();
  const [accountId, setAccountId] = useState(NaN);
  const [dateRange, setDateRange] = React.useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

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

  const hanldeDateChange = (e: DateRange | undefined) => {
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

    const resp = await axios.post("/api/ledger/getTransactions", queryParams);
    console.log(resp.data);
  };

  return (
    <div className="flex-1 flex">
      {accounts ? (
        <>
          <div className="flex-1 flex flex-col py-3 gap-5">
            <div className="flex flex-col w-fit mx-auto">
              <p className="mx-auto font-bold text-2xl">
                {findAccountName(accountId, accounts)}
              </p>
              <Separator className="border w-" />
              <p className="mx-auto font-bold text-xl">
                {dateRange.from?.toDateString()} -{" "}
                {dateRange.from?.toDateString()}
              </p>
            </div>
            <table className="border-collapse">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Detail</th>
                  <th>Remark</th>
                  <th>In</th>
                  <th>Out</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td>Balance c/d</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Separator orientation="vertical" className="border my-3 rounded" />
          <div className="flex flex-col w-1/12 min-w-fit px-5 py-3 gap-3">
            <AccountSelect
              options={accounts}
              value={findAccountName(accountId, accounts)}
              onChange={handleAccountChange}
            />
            <CalenderInput date={dateRange} onDateChange={hanldeDateChange} />
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
