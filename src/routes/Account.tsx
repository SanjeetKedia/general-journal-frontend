import SearchInput from "@/components/custom/SearchInput";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";

interface Account {
  id: number;
  name: string;
  type: string;
  description: string;
}

const Account = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);

  const getAccounts = () => {
    axios
      .get<Account[]>("/api/account/getAccounts")
      .then((resp) => {
        setAccounts(resp.data);

        console.log(resp.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col">
      <SearchInput />
      <Button onClick={getAccounts}>Get Accounts</Button>
      <ul>
        {accounts.map((x) => (
          <li key={x.id}>{x.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Account;
