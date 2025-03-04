import { Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import _ from 'lodash'

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    padding: 60,
  },
  tbl: {
    marginTop: 20,
    display: "flex",
    flexDirection: "row",
  },
  cell: {
    border: "1px solid black",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  }
});

const PDFExamLogPage = ({ testBankAudit, testSecurityCode }) => {
  return (
    <Page size="A4" style={styles.page}>
      <View style={{flexDirection: "row", alignItems: "stretch", justifyContent: "space-between", paddingBottom: 10, fontFamily: "Helvetica-Bold", fontWeight: "bold"}} fixed>
        <Text>NZART Exam</Text>
        <Text>Exam Log File</Text>
        <Text>Security Code: {testSecurityCode}</Text>
      </View>
      <View style={styles.tbl}>
        {testBankAudit.map((row, i) => (
          <View key={i}>
            {row.map((cell, j) => { 
              let cellX = _.clone(styles.cell);
              if (j==0) { 
                cellX.borderTopWidth= 1;
              }
              if (i==0) { 
                cellX.borderLeftWidth= 1;
              }
              return (
                <View key={j}>
                  <Text style={cellX}>{(j + 1) + i * 30 }. {cell}</Text>
                </View>
              )
            })}
          </View>
        ))}
      </View>
    </Page>
  )
};

export default PDFExamLogPage;
