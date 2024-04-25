import { Text, View } from '@react-pdf/renderer'
import PDFImage from './PDFImage'

const PDFQuestionItem = ({ question }) => {
  const letters = ['a', 'b', 'c', 'd'];
  return (
    <View wrap={false}>
      <Text>{question.serial + '. ' + question.question}</Text>
      <Text>&nbsp;</Text>
      { question.img ? <PDFImage pix={question.img} /> : null }
      { question.choices.map((choice, idx) => 
      <Text key={idx} style={{paddingLeft: '20'}}>
        {letters[idx] + '. ' + choice}
      </Text>
      )}
      <Text>&nbsp;</Text>
    </View>
  )
};

export default PDFQuestionItem;
