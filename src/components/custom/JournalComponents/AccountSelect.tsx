import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AccountSelect = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (e: string) => void;
  options: { id: number; name: string }[];
}) => {
  return (
    <Select
      onValueChange={(e) => {
        onChange(e);
      }}
    >
      <SelectTrigger
        className="w-full text-left px-2 py-1 border-none"
        value={value}
      >
        <SelectValue placeholder="Select an account" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option, i) => {
            return (
              <SelectItem
                key={i}
                className="cursor-pointer"
                value={"" + option.id}
              >
                {option.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AccountSelect;
