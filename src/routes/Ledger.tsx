import { Select } from "@/components/ui/select";
import { getAccounts } from "@/lib/helpers";
import { Account } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

const Ledger = () => {
  const [accounts, setAccounts] = useState<Account[]>();

  useEffect(() => {
    const accounts = axios.get("/api/account/getAccounts");
  });

  return (
    <div>
      <Select />
    </div>
  );
};

export default Ledger;
