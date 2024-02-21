import { useState } from "react"
import QuestionItem from './QuestionItem'
import Result from './Result'
import ActionButton from './ActionButton'
import ProgressIndicator from "./ProgressIndicator"
import _ from 'lodash'

let testBank = [];
let serial = 0;
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
};

const Exam = ({questionBank, handleSplashButtonClick}) => {
  const [resultVisible, setResultVisible] = useState(false);
  const [examVisible, setExamVisible] = useState(true);
  const [formData, setformData] = useState({});

  const handleResultButtonClick = (e) => {
    e.preventDefault();
    setExamVisible(false);
    setResultVisible(true);
  }
  
  const handleRetryButtonClick = (e) => {
    e.preventDefault();
    setExamVisible(true);
    setResultVisible(false);
    setformData({});
  }

  const handleRetryNewButtonClick = (e) => {
    handleRetryButtonClick(e);
    generateTestBank(questionBank);
  }

  const handleMain = (e) => {
    testBank = [];
    handleSplashButtonClick(e);
  }

  const handleSetformData = (qid, ans) => {
    let formDataDeepCopy = _.cloneDeep(formData);
    formDataDeepCopy[qid] = ans;
    setformData(formDataDeepCopy);
  }

  if (!testBank.length) {
    generateTestBank(questionBank);
  }

  return (
    <div>
      { examVisible && 
      <div>
        <form>
          <h2>Mock exam</h2>
          <ActionButton action={handleMain} label='Return to main menu' />
          { testBank.map((question) => <QuestionItem key={question.qid} question={question} handleSetformData={handleSetformData} />) }<br/>
          <ProgressIndicator responseCount = {_.toPairs(formData).length} questionCount={60} />
          <ActionButton action={handleResultButtonClick} label='Show results' />&nbsp;
          <ActionButton action={handleMain} label='Return to main menu' />
        </form> 
      </div>
      }
      { resultVisible && <Result testBank={testBank} paper={formData} handleRetryButtonClick={handleRetryButtonClick} handleRetryNewButtonClick={handleRetryNewButtonClick} handleMain={handleMain} questionCount={60} tryNew={true} /> }
    </div>
  )
};

export default Exam;
