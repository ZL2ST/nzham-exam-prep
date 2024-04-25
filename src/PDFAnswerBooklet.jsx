import { View, Text, StyleSheet } from '@react-pdf/renderer'
import _ from 'lodash'

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  cell: { padding: 10, borderStyle: "solid", borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0 },
});

const AnswerGridSection = ({answerGrid}) => (
  <View>
    {answerGrid.map((row, i) => (
      <View key={i} style={styles.row}>
        {row.map((cell, j) => {
          let cellX = _.clone(styles.cell);
          if (i==0) { 
            cellX.borderTopWidth= 1;
          }
          if (j==0 && cell < 21) { 
            cellX.borderLeftWidth= 1;
          }
          return (
            <View key={j}>
              <Text style={cellX}>{cell < 10 ? ` ${cell} ` : cell}</Text>
            </View>
          )})
        }
      </View>
    ))}
  </View>
);

const PDFAnswerBooklet = () => {
  const answerGrid1 = _.map(_.range(1,21), i => [i, 'a', 'b', 'c', 'd', ' ']);
  const answerGrid2 = _.map(_.range(21,41), i => [i, 'a', 'b', 'c', 'd', ' ']);
  const answerGrid3 = _.map(_.range(41,61), i => [i, 'a', 'b', 'c', 'd', ' ']);
  return (
    <View>
      <Text style={{paddingBottom: 20, fontSize: "14px"}}>Exam Candidate&apos;s Answer Sheet</Text>
      <View style={styles.row}>
        <AnswerGridSection answerGrid={answerGrid1} />
        <AnswerGridSection answerGrid={answerGrid2} />
        <AnswerGridSection answerGrid={answerGrid3} />
      </View>
    </View>
  )
};

export default PDFAnswerBooklet;
