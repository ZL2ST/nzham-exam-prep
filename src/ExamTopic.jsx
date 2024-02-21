import { useState } from "react"
import QuestionItem from './QuestionItem'
import Result from './Result'
import ActionButton from './ActionButton'
import _ from 'lodash'
import ProgressIndicator from "./ProgressIndicator"

let testBank = [];
let serial = 0;
let topic = null;
const generateTestBank = (questionBank, slug) => {
  testBank = [];
  serial = 0;
  topic = null;
  let topicalQuestions = _.filter(questionBank, { 'slug': slug })[0];
  topicalQuestions.questionSet.map((item) => {
    serial++;
    item.serial = serial;
    item.qid = slug + '-' + item.id;
    testBank.push(item);
  });
  topic = topicalQuestions.topic;
};

const ExamTopic = ({questionBank, slug, handleSplashButtonClick}) => {

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

  if (!testBank.length) {
    generateTestBank(questionBank, slug);
  }
  
  const handleSetformData = (qid, ans) => {
    let formDataDeepCopy = _.cloneDeep(formData);
    formDataDeepCopy[qid] = ans;
    setformData(formDataDeepCopy);
  }

  const handleMain = (e) => {
    testBank = [];
    handleSplashButtonClick(e);
  }

  return (
    <div>
      { examVisible && 
      <div>
        <form>
          <h2>Mock exam for topic: {topic}</h2>
          <ActionButton action={handleMain} label='Return to main menu' />
          { testBank.map((question) => <QuestionItem key={question.qid} question={question} formData={formData} handleSetformData={handleSetformData} />) }<br/>
          <ProgressIndicator responseCount = {_.toPairs(formData).length} questionCount={serial} />
          <ActionButton action={handleResultButtonClick} label='Show results' />&nbsp;
          <ActionButton action={handleMain} label='Return to main menu' />
        </form> 
      </div>
      }
      { resultVisible && <Result testBank={testBank} paper={formData} handleRetryButtonClick={handleRetryButtonClick} handleMain={handleMain} questionCount={serial} tryNew={false} /> }
    </div>
  )
};

export default ExamTopic;
