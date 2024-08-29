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
import { getAllAccountingDays } from "@/lib/helpers";
import { AccountingDay, JournalTransaction } from "@/lib/types";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

const OldJournal = () => {
  const [accountingDays, setAccountingDays] = useState<AccountingDay[]>([]);
  const [selectedDate, setSelectedDate] = useState<AccountingDay>();
  const [displayData, setDisplayData] = useState<JournalTransaction[]>([]);

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

  return (
    <div className="w-full max-h-screen overflow-hidden">
      <JournalNavBar />
      <Separator orientation="horizontal" />
      <div className="flex h-full">
        <div className="flex-1 py-4 px-4">
          <h1 className="text-2xl font-bold text-center">
            Accounting Day: {new Date(selectedDate.date).toLocaleDateString()}
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
        {/* Control Bar */}
        <div className="w-fit px-4 flex flex-col gap-4 pt-5 min-w-[15rem]">
          <h1 className="text-center text-2xl font-bold">Controls</h1>
          <AccountDaySelect
            accountingDays={accountingDays}
            selectedDate={selectedDate}
            updateDateChange={handleUpdateChange}
          />
          <Button onClick={handleGetJournal}>Get Journal</Button>
        </div>
      </div>
    </div>
  );
};

export default OldJournal;
