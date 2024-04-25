import { Page, View, Text, StyleSheet } from '@react-pdf/renderer'
import _ from 'lodash'


const styles = StyleSheet.create({
  page: {
    fontSize: 11,
    marginTop: 20,
    paddingTop: 20,
    paddingBottom: 50,
    marginBottom: 50,
    paddingLeft: 20,
    marginLeft: 20,
    paddingRight: 40,
    marginRight: 40,
    flexGrow: 1
  },
  tbl: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center"
  },
  row: {
    display: "flex",
  },
  cell: {
    border: "1px solid black",
    padding: "10px",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0
  }
});

const PDFAnswerPage = ({ answerChunks, testSecurityCode }) => {
  return (
    <Page size="A4" style={styles.page}>
      <Text style={{paddingBottom: 10, fontSize:12}} render={() => (
          `NZART Exam Paper Demo       Exam Marker's Answer Sheet      Security Code: ${testSecurityCode}`
        )} fixed />
      <View style={styles.tbl}>
        {answerChunks.map((row, i) => (
          <View key={i} style={styles.row}>
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
