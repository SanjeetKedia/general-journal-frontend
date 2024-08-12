import axios from "axios";
import { Account } from "./types";

export const findAccountName = (
  id: number,
  accountArray: { id: number; name: string }[]
) => {
  const account = accountArray.find((cur) => cur.id === id);

  if (account) {
    return account.name;
  } else {
    return "";
  }
};

export const formatMoney = (number: number) => {
  if (number === undefined) return;
  if (number === null) return "";
  if (number === 0) return "-";

  if (Number.isNaN(number)) return "-";

  return number.toLocaleString();
};

export const formatFromMoney = (string: string) => {
  if (string === "-") return 0;

  // Remove commas and any other formatting characters (if needed)
  const cleanedNumber = string.replace(/[^\d.]/g, "");

  // Convert to a number
  const number = parseFloat(cleanedNumber);

  return number;
};

export const getAccounts = async () => {
  const response = await axios
    .get<Account[]>("/api/account/getAccounts")
    .then((resp) => {
      return resp.data;
    })
    .catch((err) => {
      console.error(err);
    });

  return response;
};

export const formatStringToDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString(undefined, { dateStyle: "medium" });

export const getStartOfDay = (day?: Date) => {
  if (day) {
    day.setHours(0, 0, 0, 0);
    return day;
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  return startOfDay;
};
