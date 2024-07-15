import JournalDisplayTable from "@/components/custom/JournalComponents/JournalDisplayTable";
import NewAccountingDay from "@/components/custom/JournalComponents/NewAccountingDay";
import JournalEntry from "@/components/custom/JournalEntry";
import { Separator } from "@/components/ui/separator";
import { AccountingDay, JournalDataDisplay } from "@/lib/types";
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
  const [journalData, setJournalData] = useState<JournalDataDisplay>();

  const getAccountingDay = async () => {
    const response = await axios.get("/api/accountingDay/getAccountingDay");
    setDayLoad(response.data.settings.dayLoad);
    setAccoutingDay(response.data.data);

    const journalData = await axios.post("/api/journal/getJournalData", {
      accountingDay: response.data.data.id,
    });
    setJournalData(journalData.data.data);
  };

  useEffect(() => {
    getAccountingDay();
  }, []);

  const hanldeRefresh = () => {
    getAccountingDay();
  };

  const handleNewAccountingDay = () => {
    getAccountingDay();
  };

  return (
    <div className="w-full h-screen">
      {dayLoad && journalData ? (
        <div className="flex h-full">
          <div className="w-1/2 flex flex-col items-center">
            <h1 className="my-3 text-2xl">
              <span className="font-bold">
                Accounting Day {accountingDay.id}
              </span>{" "}
              : {accountingDay.date}
            </h1>
            <JournalEntry
              refreshDisplay={hanldeRefresh}
              accountingDay={accountingDay}
            />
          </div>
          <Separator orientation="vertical" className="h-full" />
          <JournalDisplayTable
            refresh={hanldeRefresh}
            journalData={journalData}
          />
        </div>
      ) : (
        <NewAccountingDay onNewAccountingDay={handleNewAccountingDay} />
      )}
    </div>
  );
};

export default Journal;
