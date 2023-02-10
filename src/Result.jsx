import ActionButton from './ActionButton'
import AnswerAnalysis from './AnswerAnalysis'
import { useEffect } from "react"

import _ from 'lodash'

const Result = ({ testBank, paper, handleRetryButtonClick, handleRetryNewButtonClick, handleMain, questionCount, tryNew }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  let score = 0;
  let analysis = [];
  let responseCount = 0;
  for (let [qid, response] of Object.entries(paper)) {
    responseCount++;
    // console.log(`${qid}: ${response}`);
    let q = _.find(testBank, { 'qid': qid });
    if (q) {
      if (q.answer === response) {
        score++;
      } 
      q.response = response;
      analysis.push(q);
    } else {
      console.log('Error: paper contains question not in testBank, dump follows.');
      console.log(paper, testBank);
    }
  }
  analysis = _.sortBy(analysis, [function(o) { return o.serial; }]);

  return (
    <div>
      <h2>Results</h2>
      Your score is {score} and you have answered {responseCount} / {questionCount} questions.<br/><br/>
      <ActionButton action={handleRetryButtonClick} label='Retry this exam' />&nbsp;
      { tryNew && <><ActionButton action={handleRetryNewButtonClick} label='Try a new exam' />&nbsp;</> }
      <ActionButton action={handleMain} label='Return to main menu' />
      { analysis.length ? <AnswerAnalysis analysis={analysis} /> : null }
    </div>
  )
};

export default Result;
