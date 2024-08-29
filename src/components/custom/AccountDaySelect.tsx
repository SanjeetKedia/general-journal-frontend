import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AccountingDay } from "@/lib/types";

const AccountDaySelect = ({
  selectedDate,
  updateDateChange,
  accountingDays,
}: {
  selectedDate: AccountingDay;
  updateDateChange: (str: string) => void;
  accountingDays: AccountingDay[];
}) => {
  return (
    <Select value={"" + selectedDate.id} onValueChange={updateDateChange}>
      <SelectTrigger>
        <SelectValue placeholder="Choose an accounting day" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {accountingDays.map((day) => {
            return (
              <SelectItem key={day.id} value={day.id + ""}>
                {new Date(day.date).toLocaleDateString()}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AccountDaySelect;
