import JournalEntry from "@/components/custom/JournalEntry";
import { Separator } from "@/components/ui/separator";
import { AccountingDay } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";

const Journal = () => {
  const [accountingDay, setAccoutingDay] = useState<AccountingDay>({
    id: NaN,
    date: "",
    isActive: false,
  });
  const [dayLoad, setDayLoad] = useState<boolean>(false);

  const getAccountingDay = async () => {
    const response = await axios.get("/api/accountingDay/getAccountingDay");
    setDayLoad(response.data.settings.dayLoad);
    setAccoutingDay(response.data.data);
  };

  useEffect(() => {
    getAccountingDay();
  }, []);

  return (
    <div className="w-full h-screen better-scrollbar">
      {dayLoad ? (
        <div className="flex h-full">
          <div className="w-1/2 flex flex-col items-center">
            <h1 className="my-3 text-2xl">
              <span className="font-bold">
                Accounting Day {accountingDay.id}
              </span>{" "}
              : {accountingDay.date}
            </h1>
            <JournalEntry accountingDay={accountingDay} />
          </div>
          <Separator orientation="vertical" className="h-full" />
          <div></div>
        </div>
      ) : (
        <div>Make a new accounting day</div>
      )}
    </div>
  );
};

export default Journal;
