import { useState } from "react";
import Td from "./Td";
import AccountSelect from "./AccountSelect";
import { Toggle } from "@/components/ui/toggle";

const JournalEntryRow = () => {
  const [value, setValue] = useState("");

  const options = ["Cash Book", "KPAY", "YOMA SP"];

  const handleAccountChange = (value: string) => {
    setValue(value);
  };

  return (
    <tr>
      <Td>
        <AccountSelect
          options={options}
          value={value}
          onChange={handleAccountChange}
        />
      </Td>
      <Td className="text-right">500,000</Td>
      <Td></Td>
      <Td className="relative">
        <Toggle className="w-full h-full absolute inset-0" />
      </Td>
    </tr>
  );
};

export default JournalEntryRow;
