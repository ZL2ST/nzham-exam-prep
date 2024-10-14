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
          <h2>NZ Amateur Radio Exam Website</h2>
          <p>
            This website contains the following:
            <ul>
              <li>
                For students and instructors: Mock exam generator to help prepare for the exam
              </li>
              <li>
                For NZART exam supervisor: Printable PDF exam papers to conduct an official exam  
              </li>
            </ul>
          </p>
          <h3>
            Student and instructor resources
          </h3>
          <p>
            Click on the &quot;Start Exam&quot; button below to generate a mock exam on 60 questions. If 
            you want to upskill on a specific topic click on the &quot;Choose a topic&quot; button below. 
            Learning materials and information on getting help from your local radio club
            is available <a href="https://www.nzart.org.nz/learn/" target="_blank" rel="noreferrer">here</a>. 
            If you prefer a printable version of the exam to practice on, click on the &quot;Generate PDF&quot; 
            button further down below. Either way, you are responsible for keeping track of time yourself.
          </p>
          <ActionButton action={handleExamButtonClick} label='Start exam' />&nbsp;
          <ActionButton action={handleTopicListButtonClick} label='Choose a topic' />&nbsp;
          <h3>
            NZART exam supervisor resources
          </h3>
          <p>
            Click on the &quot;Generate PDF&quot; button below to generate and download a printable exam paper.
            Candidates who have passed the application can apply for a call sign using the PDF form <a href="call-sign-form-v1.1.pdf" target="_blank" rel="noreferrer">here</a>. 
            Exam guidelines and processes are set by NZART which can be found <a href="https://www.nzart.org.nz/learn/exam/proceedure" target="_blank" rel="noreferrer">here</a>.
          </p>
          <GenPDF />
          <div className="fine-print">
            <p>
              The question bank used in this website are the same as the 600 questions on question bank on the 
              NZART website. Each exam randomly generates 60 questions covering all topics depending on the weight of 
              the topic, as per the exam guidelines. This exam generators run completely on your browser and does not 
              collect any information.
            </p>
            <p>
              This application has been developed by ZL2ST. The source code of this website is available on <a href="https://github.com/ZL2ST/nzham-exam-prep" target="_blank" rel="noreferrer">GitHub.</a> Any contributions or bug reports are welcome.
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
