import { PDFViewer } from '@react-pdf/renderer'
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer'
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

// https://stackoverflow.com/a/50579690/
const crc32=function(r){for(var a,o=[],c=0;c<256;c++){a=c;for(var f=0;f<8;f++)a=1&a?3988292384^a>>>1:a>>>1;o[c]=a}for(var n=-1,t=0;t<r.length;t++)n=n>>>8^o[255&(n^r.charCodeAt(t))];return(-1^n)>>>0};

let testBank = [];
let serial = 0;
let answerChunks = [];
let testSecurityCode = '';
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
  testSecurityCode = crc32(JSON.stringify(answerChunks));
  answerChunks = _.chunk(answerChunks,10);
};

const GenPDF = ({ questionBank }) => {
  generateTestBank(questionBank);
  return (
  <PDFViewer width="100%" height="100%">
    <Document>
      <Page size="A4" style={styles.page} >
          <Text style={{paddingBottom: 10, fontSize:12}} render={({ pageNumber, totalPages }) => (
            `NZART Exam Paper Demo       Page ${pageNumber} / ${totalPages - 2}      Security Code: ${testSecurityCode}`
          )} fixed />
          {testBank.map((question) => (
            <PDFQuestionItem key={question.qid} question={question} />
          ))}
      </Page>
      <PDFAnswerPage answerChunks={answerChunks} testSecurityCode={testSecurityCode} />
      <Page size="A4" style={styles.page} >
        <Text style={{paddingBottom: 10, fontSize:12}} render={() => (
          `NZART Exam Paper Demo       Exam Candidate's Answer Sheet      Security Code: ${testSecurityCode}`
        )} fixed />
        <PDFAnswerBooklet />
      </Page>
    </Document>
  </PDFViewer>
  )
};

export default GenPDF;
