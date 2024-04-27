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
    paddingHorizontal: "30px",
    paddingVertical: "26px",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  }
});

const PDFAnswerPage = ({ answerChunks, testSecurityCode }) => {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={{paddingBottom: 10, fontFamily: "Helvetica-Bold", fontWeight: "bold"}} render={() => (
          `NZART Exam Paper Demo       Marker's Answer Sheet      Security Code: ${testSecurityCode}`
        )} fixed />
      <View style={styles.tbl}>
        {answerChunks.map((row, i) => (
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
                  <Text style={cellX}>{(j + 1) + i * 10}. {cell}</Text>
                </View>
              )
            })}
          </View>
        ))}
      </View>
    </Page>
  )
};

export default PDFAnswerPage;
