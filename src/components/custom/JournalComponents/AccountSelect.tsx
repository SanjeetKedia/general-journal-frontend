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
  options: string[];
}) => {
  return (
    <Select
      value={value}
      onValueChange={(e) => {
        onChange(e);
      }}
    >
      <SelectTrigger className="w-full text-left px-2 py-1">
        <SelectValue placeholder="Select an account" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {/* <SelectItem className="cursor-pointer" value="apple">
            Apple
          </SelectItem>
          <SelectItem className="cursor-pointer" value="banana">
            Banana
          </SelectItem>
          <SelectItem className="cursor-pointer" value="blueberry">
            Blueberry
          </SelectItem>
          <SelectItem className="cursor-pointer" value="grapes">
            Grapes
          </SelectItem>
          <SelectItem className="cursor-pointer" value="pineapple">
            Pineapple
          </SelectItem> */}
          {options.map((option, i) => {
            return (
              <SelectItem key={i} className="cursor-pointer" value={option}>
                {option}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default AccountSelect;
