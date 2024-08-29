import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { DoubleEntryRow, DoubleEntryTable } from "../JournalTable";
import {
  AccountingDay,
  BackendResponse,
  JournalTransaction,
} from "@/lib/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import apiClient from "@/lib/axiosInstance";

const JournalTransactionDialog = ({
  isOpen,
  closeDialog,
  transactionToShow,
}: {
  isOpen: boolean;
  closeDialog: () => void;
  transactionToShow: JournalTransaction | null;
}) => {
  const [accountingDay, setAccountingDay] = useState<AccountingDay | null>(
    null
  );

  useEffect(() => {
    if (transactionToShow) {
      apiClient
        .post<BackendResponse<AccountingDay>>(
          "/api/accountingDay/getAccountingDayById",
          {
            id: transactionToShow.accountingDay,
          }
        )
        .then((res) => {
          const data = res.data.data;
          setAccountingDay(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [transactionToShow]);

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent className="min-w-fit px-12">
        {transactionToShow && accountingDay ? (
          <>
            <DialogTitle>Journal Transaction</DialogTitle>
            <div className="text-center text-xl mb-[-1rem]">
              Accounting Day:{" "}
              {new Date(accountingDay.date).toLocaleDateString()}
            </div>
            <DoubleEntryTable>
              <DoubleEntryRow transaction={transactionToShow} />
            </DoubleEntryTable>
            <DialogFooter>
              <Button variant="outline" onClick={closeDialog}>
                Exit
              </Button>
            </DialogFooter>
          </>
        ) : (
          <Loader2 />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default JournalTransactionDialog;
