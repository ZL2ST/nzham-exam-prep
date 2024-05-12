import './App.css'
import ActionButton from './ActionButton'
import { useState } from "react"
import Exam from './Exam'
import TopicList from './TopicList'
import GenPDF from './GenPDF'
import React from 'react'
import { questionBank } from './nzart.json'

const App = () => { 
  const [splashVisible, setSplashVisible] = useState(true);
  const [examVisible, setExamVisible] = useState(false);
  const [topicListVisible, setTopicListVisible] = useState(false);

  const handleExamButtonClick = () => {
    setSplashVisible(false);
    setExamVisible(true);
  }
  const handleTopicListButtonClick = () => {
    setSplashVisible(false);
    setTopicListVisible(true);
  }
  const handleSplashButtonClick = (e) => {
    e.preventDefault();
    setSplashVisible(true);
    setExamVisible(false);
    setTopicListVisible(false);
  }

  return (
    <div className="App">
      { splashVisible && 
        <>
          <h2>NZ Amateur Radio Exam preparation tool</h2>
          <p>
            This webapp will help you to prepare for your NZ Amateur Radio Exam. You can choose to generate 
            a mock exam on 60 questions or upskill on a specific topic. Good luck with your studies, we 
            will see you on the air!
          </p>
          <ActionButton action={handleExamButtonClick} label='Start exam' />&nbsp;
          <ActionButton action={handleTopicListButtonClick} label='Choose a topic' />&nbsp;
          <GenPDF />
          <div className="fine-print">
            <p>
              The question bank used in this tool are the same as the 600 questions on question bank on the 
              NZART website, as well as the official software used to generate the exams. The mock exam 
              generates 60 questions covering all topics depending on the weight of the topic, as per the 
              official exam. This webapp runs completely on your browser and does not collect any information.
            </p>
            <p>
              This application has been developed by ZL2ST and the question bank has been used with
              the kind permission of NZART. 
            </p>
            <p>
              The source code of this tool is available on <a href="https://github.com/ZL2ST/nzham-exam-prep" target="_blank" rel="noreferrer">GitHub.</a> Any contributions or bug reports are welcome.
            </p>
          </div>
        </> 
      }
      { examVisible && <Exam questionBank={questionBank} handleSplashButtonClick={handleSplashButtonClick} /> }
      { topicListVisible && <TopicList questionBank={questionBank} handleSplashButtonClick={handleSplashButtonClick} /> }
    </div>
  )
}

export default App;
