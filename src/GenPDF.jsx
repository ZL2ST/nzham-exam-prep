import { PDFViewer } from '@react-pdf/renderer'
import { Document, Page, StyleSheet } from '@react-pdf/renderer'
import _ from 'lodash'
import PDFQuestionItem from './PDFQuestionItem'
import PDFAnswerPage from './PDFAnswerPage'
import PDFAnswerBooklet from './PDFAnswerBooklet'

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
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

let testBank = [];
let serial = 0;
let answerChunks = [];
const generateTestBank = (questionBank) => {
  testBank = [];
  serial = 0;
  questionBank.map(topic => {
    let weightedQuestions = _.sampleSize(_.filter(questionBank, { 'slug': topic.slug })[0].questionSet, topic.weight);
    // for all 600 q: let weightedQuestions = _.filter(questionBank, { 'slug': topic.slug })[0].questionSet;
    weightedQuestions.map((item) => {
      serial++;
      item.serial = serial;
      item.qid = topic.slug + '-' + item.id;
      testBank.push(item);
    });
  });
  answerChunks = _.map(testBank, 'answer').map(num => String.fromCharCode('a'.charCodeAt(0) + num - 1));
  answerChunks = _.chunk(answerChunks,10);
};

const GenPDF = ({ questionBank }) => {
  generateTestBank(questionBank);
  return (
  <PDFViewer width="100%" height="100%">
    <Document>
      <Page size="A4" style={styles.page} >
          {testBank.map((question) => (
            <PDFQuestionItem key={question.qid} question={question} />
          ))}
      </Page>
      <PDFAnswerPage answerChunks={answerChunks} />
      <Page size="A4" style={styles.page} >
        <PDFAnswerBooklet />
      </Page>
    </Document>
  </PDFViewer>
  )
};

export default GenPDF;
