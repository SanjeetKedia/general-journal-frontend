import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { getAccounts } from "@/lib/helpers";
import type { Account } from "@/lib/types";
import axios from "axios";
import { ChangeEvent, PropsWithChildren, useState } from "react";

// Types

interface AccountFormType {
  name: string;
  type: string;
  description: string;
}

// React Components
const InputDiv = ({ children }: PropsWithChildren) => {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">{children}</div>
  );
};

const Account = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountFormData, setAccountFormData] = useState<AccountFormType>({
    name: "",
    type: "",
    description: "",
  });

  // Handle Functions
  const handleGetAccounts = async () => {
    const accounts = await getAccounts();
    if (accounts) {
      setAccounts(accounts);
    }
  };

  /////////////
  const handleFormInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setAccountFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSelectChange = (option: string) => {
    setAccountFormData((prev) => {
      return {
        ...prev,
        type: option,
      };
    });
  };

  const handleSaveNewAccount = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const accountDetail = await axios<{ id: number; name: string }[]>(
      "/api/account/getAccountNames"
    )
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        alert(err);
      });

    if (!accountDetail) {
      return alert("ERROR");
    }

    const accountNames = accountDetail.map((account) => account.name);

    if (accountNames.indexOf(accountFormData.name) !== -1) {
      return alert(`The account name: ${accountFormData.name} already exists!`);
    }

    if (accountFormData.type == "") {
      return alert("Choose an account type");
    }

    if (accountFormData.description == "") {
      return alert("The description is empty");
    }

    axios.post("/api/account/makeAccount", accountFormData);
  };

  return (
    <div className="flex">
      <div className="flex flex-col px-11 py-6 w-80">
        <form className="w-full flex flex-col gap-5">
          <InputDiv>
            <Label className="text-lg" htmlFor="name">
              Account Name
            </Label>
            <Input
              className="w-full"
              id="name"
              name="name"
              value={accountFormData.name}
              onChange={handleFormInputChange}
            />
          </InputDiv>
          <InputDiv>
            <Label className="text-lg">Account Type</Label>
            <Select
              value={accountFormData.type}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asset">Asset</SelectItem>
                <SelectItem value="liability">Liability</SelectItem>
                <SelectItem value="capital">Capital</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>
          </InputDiv>
          <InputDiv>
            <Label className="text-lg">Description</Label>
            <Textarea
              placeholder="Account description"
              name="description"
              value={accountFormData.description}
              onChange={handleFormInputChange}
            />
          </InputDiv>
          <Button onClick={(e) => handleSaveNewAccount(e)}>Add Account</Button>
        </form>
      </div>
      <Separator orientation="vertical" className="mx-20" />
      <div className="flex flex-col">
        {/* <SearchInput /> */}
        <Button onClick={handleGetAccounts}>Get Accounts</Button>
        <ul>
          {accounts.map((x) => (
            <li key={x.id}>{x.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Account;
