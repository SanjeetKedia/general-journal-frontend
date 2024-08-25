import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import apiClient from "@/lib/axiosInstance";
import { useState } from "react";

const NewAccountingDay = ({
  onNewAccountingDay,
}: {
  onNewAccountingDay: () => void;
}) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  //  Handle Functions
  const handleNewAccountingDay = async () => {
    await apiClient.post("/api/accountingDay/makeNewAccountingDay", {
      date: date,
    });

    onNewAccountingDay();
  };

  const handleDateSelect = (e: Date | undefined) => {
    if (e == undefined) return;

    // const currentDate = new Date();

    // if (e < currentDate) {
    //   return undefined;
    // }

    setDate(e);
  };

  return (
    <div className="flex flex-col items-center my-32 gap-5 py-5">
      <p className="border-b rounded-sm w-fit p-3 text-right text-2xl">
        {date?.toDateString() || "Please select a date"}
      </p>
      <Calendar
        mode="single"
        selected={date}
        onSelect={(e) => handleDateSelect(e)}
      />
      <Button disabled={date == undefined} onClick={handleNewAccountingDay}>
        Make Accounting Day
      </Button>
    </div>
  );
};

export default NewAccountingDay;
