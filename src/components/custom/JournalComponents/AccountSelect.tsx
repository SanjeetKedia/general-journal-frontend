import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { forwardRef, Ref } from "react";

interface AccountSelectProps {
  value: number;
  onChange: (e: string) => void;
  options: { id: number; name: string }[];
  className?: string;
  ref: Ref<HTMLInputElement>;
}

const AccountSelect = forwardRef<HTMLButtonElement, AccountSelectProps>(
  ({ value, onChange, options, className }, ref) => {
    return (
      <Select
        onValueChange={(e) => {
          onChange(e);
        }}
        value={isNaN(value) ? "" : String(value)}
      >
        <SelectTrigger
          ref={ref}
          className={cn("w-full text-left px-2 py-1", className)}
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
  }
);

export default AccountSelect;
