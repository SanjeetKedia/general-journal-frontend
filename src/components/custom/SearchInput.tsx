import {
  Command,
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk";

const SearchInput = () => {
  return (
    <CommandDialog>
      <Command>
        <CommandInput placeholder="Search The Account" />
        <CommandList>
          <CommandGroup>
            <CommandItem>Cash Book</CommandItem>
            <CommandItem>KPAY</CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
};

export default SearchInput;
