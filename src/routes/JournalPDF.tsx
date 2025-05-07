import { formatMoney } from "@/lib/helpers";
import { AccountTotals, JournalTransaction } from "@/lib/types";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10,
    fontFamily: "Helvetica",
    position: "relative",
  },
  title: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableHeader: {
    borderTop: "1px sold #000",
    flexDirection: "row",
    borderBottom: "1px solid #000",
    backgroundColor: "#eee",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "0.5px solid #ccc",
  },
  footerRow: {
    flexDirection: "row",
    borderTop: "1px solid #000",
    borderBottom: "1px solid #000",
  },
  cell: {
    borderRight: "0.5px solid #ccc",
    padding: 4,
    justifyContent: "center",
    minHeight: 18,
  },
  firstCol: {
    borderLeft: "0.5px solid #ccc",
  },
  colNo: {
    flex: 0.5,
  },
  colAccount: {
    flex: 2.3,
  },
  colRemark: {
    flex: 1.5,
  },
  colDebit: {
    flex: 0.85,
    textAlign: "right",
  },
  colCredit: {
    flex: 0.85,
    textAlign: "right",
  },
  colBlank: {
    flex: 0.5,
  },
  colDesc: {
    flex: 3.5,
    paddingLeft: "0.5px",
    paddingRight: "2px",
  },
  bold: {
    fontWeight: "bold",
  },
  headerCenter: {
    textAlign: "center",
  },
  alignRight: {
    textAlign: "right",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "gray",
  },
});

const totalAccountStyles = StyleSheet.create({
  tableContainer: {
    marginTop: 30,
  },
  title: {
    fontSize: 12,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableHeader: {
    borderTop: "1px sold #000",
    flexDirection: "row",
    borderBottom: "1px solid #000",
    backgroundColor: "#eee",
    textAlign: "center",
  },
  colAccountName: {
    flex: 3,
    borderLeft: "0.5px solid #ccc",
  },
  colDebit: {
    flex: 1,
  },
  colCredit: {
    flex: 1,
  },
});

type Props = {
  transactions: JournalTransaction[];
  date: string;
  accountTotals: AccountTotals[];
};

export const JournalPDF = ({ transactions, date, accountTotals }: Props) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      <Text style={styles.title} fixed>
        General Journal: {date}
      </Text>

      {/* Table Header */}
      <View style={styles.tableHeader} fixed>
        <Text style={[styles.cell, styles.colNo, styles.firstCol]}>No</Text>
        <Text style={[styles.cell, styles.colAccount]}>Account</Text>
        <Text style={[styles.cell, styles.colRemark]}>Remark</Text>
        <Text style={[styles.cell, styles.colDebit, styles.headerCenter]}>
          Debit
        </Text>
        <Text style={[styles.cell, styles.colCredit, styles.headerCenter]}>
          Credit
        </Text>
        <Text style={[styles.cell, styles.colBlank]}> </Text>
        <Text style={[styles.cell, styles.colBlank]}> </Text>
      </View>

      {/* Transactions */}
      {transactions.map((txn, txnIndex) => {
        const totalDebit = txn.journalRow
          .filter((r) => r.amount >= 0)
          .reduce((sum, r) => sum + r.amount, 0);
        const totalCredit = txn.journalRow
          .filter((r) => r.amount < 0)
          .reduce((sum, r) => sum + Math.abs(r.amount), 0);

        return (
          <View key={txn.id} wrap={false}>
            {/* Journal Rows */}
            {txn.journalRow.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.tableRow}>
                <Text
                  style={[
                    styles.cell,
                    styles.colNo,
                    { textAlign: "center" },
                    styles.firstCol,
                  ]}
                >
                  {rowIndex === 0 ? txnIndex + 1 : ""}
                </Text>
                <Text style={[styles.cell, styles.colAccount]}>
                  {row.accountName}
                </Text>
                <Text style={[styles.cell, styles.colRemark]}>
                  {row.remark}
                </Text>
                <Text style={[styles.cell, styles.colDebit]}>
                  {row.amount >= 0 ? formatMoney(row.amount) : ""}
                </Text>
                <Text style={[styles.cell, styles.colCredit]}>
                  {row.amount < 0 ? formatMoney(-row.amount) : ""}
                </Text>
                <Text style={[styles.cell, styles.colBlank]}> </Text>
                <Text style={[styles.cell, styles.colBlank]}> </Text>
              </View>
            ))}

            {/* Footer Row */}
            <View style={styles.footerRow}>
              <Text style={[styles.cell, styles.colNo, styles.firstCol]}></Text>
              <Text style={[styles.cell, styles.colAccount, styles.bold]}>
                {txn.description}
              </Text>
              <Text style={[styles.cell, styles.colRemark, styles.bold]}></Text>
              <Text style={[styles.cell, styles.colDebit, styles.bold]}>
                {formatMoney(totalDebit)}
              </Text>
              <Text style={[styles.cell, styles.colCredit, styles.bold]}>
                {formatMoney(totalCredit)}
              </Text>
              <Text style={[styles.cell, styles.colBlank]}> </Text>
              <Text style={[styles.cell, styles.colBlank]}> </Text>
            </View>
          </View>
        );
      })}

      {/* Page Number */}
      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed // Ensures it appears on every page
      />
    </Page>
    <Page size="A4" style={styles.page} wrap>
      <View wrap={false} style={totalAccountStyles.tableContainer}>
        <Text style={totalAccountStyles.title}>Balance Changes: {date}</Text>

        <View style={[styles.tableHeader]}>
          <Text style={[styles.cell, totalAccountStyles.colAccountName]}>
            Account Name
          </Text>
          <Text style={[styles.cell, totalAccountStyles.colDebit]}>Debit</Text>
          <Text style={[styles.cell, totalAccountStyles.colCredit]}>
            Credit
          </Text>
        </View>
        {accountTotals.map((acc) => {
          return (
            <View style={[styles.tableRow]} key={acc.accountId}>
              <Text style={[styles.cell, totalAccountStyles.colAccountName]}>
                {acc.accountName}
              </Text>
              <Text
                style={[
                  styles.cell,
                  totalAccountStyles.colDebit,
                  styles.alignRight,
                ]}
              >
                {acc.total > 0 && formatMoney(acc.total)}
              </Text>
              <Text
                style={[
                  styles.cell,
                  totalAccountStyles.colCredit,
                  styles.alignRight,
                ]}
              >
                {acc.total < 0 && formatMoney(acc.total)}
              </Text>
            </View>
          );
        })}
      </View>
      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed // Ensures it appears on every page
      />
    </Page>
  </Document>
);
