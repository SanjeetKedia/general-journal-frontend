import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const AccountSelect = ({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (e: string) => void;
  options: { id: number; name: string }[];
  className?: string;
}) => {
  return (
    <Select
      onValueChange={(e) => {
        onChange(e);
      }}
    >
      <SelectTrigger
        className={cn("w-full text-left px-2 py-1", className)}
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
