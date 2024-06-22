import { ChangeEvent } from "react";
import Td from "./Td";
import AccountSelect from "./AccountSelect";
import { Toggle } from "@/components/ui/toggle";
import { Account, TransactionData } from "@/lib/types";
import { findAccountName, formatMoney } from "@/lib/helpers";

const NumInput = ({
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

const Input = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      className="bg-transparent h-full w-full absolute inset-0 px-2 py-1"
      value={value}
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
  onRemarkChange,
  accounts,
}: {
  data: TransactionData;
  row: number;
  onAccountChange: (value: string, row: number) => void;
  onToggleChange: (row: number) => void;
  onAmountChange: (e: ChangeEvent<HTMLInputElement>, row: number) => void;
  onRemarkChange: (e: ChangeEvent<HTMLInputElement>, row: number) => void;
  accounts: Account[];
}) => {
  // Handle Fucntions
  const handleAccountChange = (value: string) => {
    onAccountChange(value, row);
  };

  const handleToggleChange = () => onToggleChange(row);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) =>
    onAmountChange(e, row);

  const handleRemarkChange = (e: ChangeEvent<HTMLInputElement>) =>
    onRemarkChange(e, row);

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
        <Input value={data.remark} onChange={handleRemarkChange} />
      </Td>
      <Td className="relative">
        {data.isDebit && (
          <NumInput
            value={data.amount}
            onChange={handleAmountChange}
          ></NumInput>
        )}
      </Td>
      <Td className="relative">
        {!data.isDebit && (
          <NumInput
            value={data.amount}
            onChange={handleAmountChange}
          ></NumInput>
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
