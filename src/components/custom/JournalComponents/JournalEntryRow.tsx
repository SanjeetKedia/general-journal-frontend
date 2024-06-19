import { ChangeEvent } from "react";
import Td from "./Td";
import AccountSelect from "./AccountSelect";
import { Toggle } from "@/components/ui/toggle";
import { TransactionData } from "@/lib/types";
import { findAccountName, formatMoney } from "@/lib/helpers";

const Input = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className="bg-transparent h-full w-full absolute inset-0 px-2 py-1 text-right"
      value={formatMoney(value)}
      onChange={onChange}
    />
  );
};

const JournalEntryRow = ({
  data,
  row,
  onAccountChange,
  onToggleChange,
  onAmountChange,
}: {
  data: TransactionData;
  row: number;
  onAccountChange: (value: string, row: number) => void;
  onToggleChange: (row: number) => void;
  onAmountChange: (e: ChangeEvent<HTMLInputElement>, row: number) => void;
}) => {
  // Handle Fucntions
  const handleAccountChange = (value: string) => {
    onAccountChange(value, row);
  };

  const handleToggleChange = () => onToggleChange(row);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) =>
    onAmountChange(e, row);

  const accounts = [
    { id: 1, name: "Cash Book" },
    {
      id: 2,
      name: "KPAY",
    },
    {
      id: 3,
      name: "YOMA",
    },
  ];

  const accountName = findAccountName(2, accounts);

  return (
    <tr>
      <Td>
        <AccountSelect
          options={accounts}
          value={accountName}
          onChange={handleAccountChange}
        />
      </Td>
      <Td className="relative">
        {data.isDebit && (
          <Input value={data.amount} onChange={handleAmountChange}></Input>
        )}
      </Td>
      <Td className="relative">
        {!data.isDebit && (
          <Input value={data.amount} onChange={handleAmountChange}></Input>
        )}
      </Td>
      <Td className="relative">
        <Toggle
          pressed={data.isDebit}
          onPressedChange={handleToggleChange}
          className="w-full h-full absolute inset-0 text-black data-[state='on']:bg-gradient-to-br from-primary to-secondary"
        />
      </Td>
    </tr>
  );
};

export default JournalEntryRow;
