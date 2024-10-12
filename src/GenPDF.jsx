import { PDFDownloadLink, View } from '@react-pdf/renderer'
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer'
import _ from 'lodash'
import PDFQuestionItem from './PDFQuestionItem'
import PDFAnswerPage from './PDFAnswerPage'
import PDFAnswerBooklet from './PDFAnswerBooklet'
import PDFExamLogPage from './PDFExamLogPage'
import { questionBank } from './nzart.json'

const styles = StyleSheet.create({
  page: {
    fontSize: 12,
    padding: 60,
  }
});

// https://stackoverflow.com/a/50579690/
const crc32=function(r){for(var a,o=[],c=0;c<256;c++){a=c;for(var f=0;f<8;f++)a=1&a?3988292384^a>>>1:a>>>1;o[c]=a}for(var n=-1,t=0;t<r.length;t++)n=n>>>8^o[255&(n^r.charCodeAt(t))];return(-1^n)>>>0};

let testBank = [];
let testBankAudit = [];
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
  testBankAudit = _.chunk(_.map(testBank, 'qid'), 30);
};

const GenPDF = () => {
  generateTestBank(questionBank);
  const Paper = () => {
    return (
      <Document>
        <Page size="A4" style={styles.page} >
          <View style={{flexDirection: "row", alignItems: "stretch", justifyContent: "space-between", paddingBottom: 20, fontFamily: "Helvetica-Bold", fontWeight: "bold"}} fixed>
            <Text>NZART Exam</Text>
            <Text render={({ subPageNumber, subPageTotalPages }) => (
              `Page ${subPageNumber} / ${subPageTotalPages}`
            )} />
            <Text>Security Code: {testSecurityCode}</Text>
          </View>
          {testBank.map((question) => (
            <PDFQuestionItem key={question.qid} question={question} />
          ))}
        </Page>
        <Page size="A4" style={styles.page} >
          <View style={{flexDirection: "row", alignItems: "stretch", justifyContent: "space-between", paddingBottom: 10, fontFamily: "Helvetica-Bold", fontWeight: "bold"}} fixed>
            <Text>NZART Exam Paper Demo</Text>
            <Text>Candidate&rsquo;s Answer Sheet</Text>
            <Text>Security Code: {testSecurityCode}</Text>
          </View>
          <Text style={{paddingBottom: 10, paddingTop: 10, fontFamily: "Helvetica-Bold", fontWeight: "bold", textAlign:"center"}}>Name: _______________________________</Text>
          <PDFAnswerBooklet />
        </Page>
        <PDFAnswerPage answerChunks={answerChunks} testSecurityCode={testSecurityCode} />
        <PDFExamLogPage testBankAudit={testBankAudit} testSecurityCode={testSecurityCode} />
      </Document>
    )
  }
  const pdfDownloadName = `nzart-exam-${testSecurityCode}.pdf`;
  return (
    <PDFDownloadLink document={<Paper />} fileName={pdfDownloadName}>
      {({ loading }) =>
        loading ? 'Loading document...' : <button>Generate PDF</button>
      }
    </PDFDownloadLink>
  );
};

export default GenPDF;
