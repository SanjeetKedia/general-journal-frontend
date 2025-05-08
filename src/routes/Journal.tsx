import JournalDisplayTable from "@/components/custom/JournalComponents/JournalDisplayTable";
import NewAccountingDay from "@/components/custom/JournalComponents/NewAccountingDay";
import JournalEntry from "@/components/custom/JournalEntry";
import { Separator } from "@/components/ui/separator";
import { formatStringToDate } from "@/lib/helpers";
import { AccountingDay, JournalDataDisplay } from "@/lib/types";
import apiClient from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import JournalNavBar from "@/components/pageComponents/JournalNavBar";
import { Loader } from "lucide-react";

const defaultAccountingDay = {
  id: NaN,
  date: "",
  isActive: false,
};

const Journal = () => {
  const [accountingDay, setAccoutingDay] =
    useState<AccountingDay>(defaultAccountingDay);
  const [dayLoad, setDayLoad] = useState<boolean | null>(null);
  const [journalData, setJournalData] = useState<JournalDataDisplay>();

  const getAccountingDay = async () => {
    const response = await apiClient.get("/api/accountingDay/getAccountingDay");

    const journalData = await apiClient.post("/api/journal/getJournalData", {
      accountingDay: response.data.data.id,
    });
    setJournalData(journalData.data.data);
    setDayLoad(response.data.settings.dayLoad);
    setAccoutingDay(response.data.data);
  };

  useEffect(() => {
    getAccountingDay();
  }, []);

  const hanldeRefresh = () => {
    getAccountingDay();
  };

  const handleEndAccountingDay = async () => {
    if (isNaN(accountingDay.id)) return;

    const response = await apiClient.post(
      "/api/accountingDay/endAccountingDay",
      {
        id: accountingDay.id,
      }
    );

    if (response.data.error.length > 0) {
      console.log(response.data.error);
      return;
    }

    setDayLoad(response.data.settings.dayLoad);
    setAccoutingDay(defaultAccountingDay);
  };

  const handleNewAccountingDay = () => {
    getAccountingDay();
  };

  if (dayLoad === null) {
    return <Loader />;
  }

  return (
    <div className="w-full max-h-screen flex flex-col">
      <JournalNavBar />
      <Separator orientation="horizontal" />
      {dayLoad && journalData ? (
        <div className="flex h-full  overflow-x-auto">
          <div className="flex-1 flex flex-col items-center">
            <h1 className="my-3 text-2xl">
              <span className="font-bold">
                Accounting Day {accountingDay.id}
              </span>{" "}
              : {formatStringToDate(accountingDay.date)}
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
            endAccountingDay={handleEndAccountingDay}
          />
        </div>
      ) : (
        <NewAccountingDay onNewAccountingDay={handleNewAccountingDay} />
      )}
    </div>
  );
};

export default Journal;
