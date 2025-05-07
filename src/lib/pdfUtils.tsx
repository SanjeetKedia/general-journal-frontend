// utils/pdfUtils.ts
import { pdf } from "@react-pdf/renderer";
import { JournalPDF } from "@/routes/JournalPDF";
import { AccountTotals, JournalTransaction } from "./types";

export const downloadJournalPdf = async (
  accountTotals: AccountTotals[],
  date: string,
  transactions: JournalTransaction[],
  filename: string
) => {
  const blob = await pdf(
    <JournalPDF
      accountTotals={accountTotals}
      date={date}
      transactions={transactions}
    />
  ).toBlob();

  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = filename.endsWith(".pdf") ? filename : `${filename}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(blobUrl);
};
