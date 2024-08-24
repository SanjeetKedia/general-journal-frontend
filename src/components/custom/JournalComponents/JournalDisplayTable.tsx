import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import apiClient from "@/lib/axiosInstance";
import { findAccountName, formatMoney, getAccounts } from "@/lib/helpers";
import { JournalDataDisplay } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";
import { useEffect, useState } from "react";

const Th = ({
  className,
  children,
}: {
  className?: string;
  children: string;
}) => {
  return <th className={cn("px-4 border-2 py-2", className)}>{children}</th>;
};

const Td = ({
  className,
  children,
  colSpan,
  rowSpan,
}: {
  className?: string;
  children?: string | number;
  colSpan?: number;
  rowSpan?: number;
}) => {
  return (
    <td
      className={cn("border-x px-2 py-2", className)}
      colSpan={colSpan}
      rowSpan={rowSpan}
      onClick={() => {}}
    >
      {children}
    </td>
  );
};

const JournalDisplayTable = ({
  journalData,
  refresh,
  endAccountingDay,
}: {
  journalData: JournalDataDisplay;
  refresh: () => void;
  endAccountingDay: () => Promise<void>;
}) => {
  const [accounts, setAccounts] = useState<{ id: number; name: string }[]>();
  const [selectedRow, setSelectedRow] = useState<number>(NaN);

  useEffect(() => {
    getAccounts().then((data) => {
      if (!data) return;

      const accountNames = data.map((account) => {
        return { id: account.id, name: account.name };
      });

      setAccounts(accountNames);
    });
  }, []);

  // Handle Functions
  const handleRowClicked = (id: number) => {
    if (id == selectedRow) {
      setSelectedRow(NaN);
      return;
    }

    setSelectedRow(id);
  };

  const handleDeteRow = async () => {
    if (isNaN(selectedRow)) return;

    await apiClient.post("/api/journal/deleteJournalData", {
      id: selectedRow,
    });

    setSelectedRow(NaN);

    refresh();
  };

  return (
    <div className="grid grid-cols-5 grid-rows-[auto_1fr_auto] flex-auto max-h-screen">
      <h1 className="text-center text-2xl p-3 grid-rows-subgrid col-span-5">
        General Journal
      </h1>
      <ScrollArea className="col-span-4 w-full px-7">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary">
              <Th>No</Th>
              <Th>Account</Th>
              <Th>Remark</Th>
              <Th>Debit</Th>
              <Th>Credit</Th>
            </tr>
          </thead>
          <tbody>
            {journalData.map((entry, i) => {
              return (
                <React.Fragment key={i}>
                  <tr
                    onClick={() => {
                      handleRowClicked(entry.id);
                    }}
                    key={i}
                    className="data-[isselected=true]:bg-primary"
                    data-isselected={selectedRow == entry.id}
                  >
                    <Td
                      className="text-center"
                      rowSpan={entry.journalRow.length + 1}
                    >
                      {entry.id}
                    </Td>
                  </tr>
                  {entry.journalRow.map((row, i) => {
                    return (
                      <tr key={i}>
                        <Td>
                          {accounts && findAccountName(row.accountId, accounts)}
                        </Td>
                        <Td>{row.remark}</Td>
                        {row.amount < 0 ? (
                          <>
                            <Td></Td>
                            <Td className="text-right">
                              {formatMoney(row.amount * -1)}
                            </Td>
                          </>
                        ) : (
                          <>
                            <Td className="text-right">
                              {formatMoney(row.amount)}
                            </Td>
                            <Td></Td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                  <tr className="bg-secondary">
                    <Td className="">Desc:</Td>
                    <Td colSpan={2} className="">
                      {entry.description}
                    </Td>
                    <Td className="text-center font-bold">
                      {formatMoney(entry.amount)}
                    </Td>
                    <Td className="text-center font-bold">
                      {formatMoney(entry.amount)}
                    </Td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </ScrollArea>
      <div className="flex flex-col align-center px-6 gap-2">
        <Button disabled={isNaN(selectedRow)} onClick={handleDeteRow}>
          Delete Line
        </Button>
        <Button onClick={endAccountingDay}>End Accounting Day</Button>
      </div>
    </div>
  );
};

export default JournalDisplayTable;
