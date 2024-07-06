import { formatMoney } from "@/lib/helpers";
import Td from "./Td";
import { Th } from "./Th";
import { ChangeEvent } from "react";

export const Thead = () => {
  return (
    <thead>
      <tr>
        <Th>No</Th>
        <Th className="w-64">Account</Th>
        <Th className="">Remark</Th>
        <Th className="">Debit</Th>
        <Th className="">Credit</Th>
        <Th className="w-fit">IsDebit</Th>
      </tr>
    </thead>
  );
};

export const TFoot = ({
  description,
  handleDescriptionChange,
  totals,
}: {
  description: string;
  handleDescriptionChange: (e: ChangeEvent<HTMLInputElement>) => void;
  totals: {
    debit: number;
    credit: number;
  };
}) => {
  return (
    <tfoot>
      <tr className="">
        <Td className="text-right border-t-primary border-t-2 border-b-primary border-b-2 font-semibold">
          Desc:
        </Td>
        <Td
          colSpan={2}
          className="italic border-t-primary border-t-2 border-b-primary border-b-2 font-semibold"
        >
          <input
            className="h-full w-full bg-transparent py-3 px-2"
            value={description}
            onChange={handleDescriptionChange}
          />
        </Td>
        <Td className="text-center border-t-primary border-t-2 border-b-primary border-b-2 font-semibold">
          {formatMoney(totals.debit)}
        </Td>
        <Td className="text-center border-t-primary border-t-2 border-b-primary border-b-2 font-semibold">
          {formatMoney(totals.credit)}
        </Td>
        <Td className="text-right border-t-primary border-t-2 border-b-primary border-b-2 font-semibold"></Td>
      </tr>
    </tfoot>
  );
};
