const QuestionItem = ({ question, handleSetformData }) => {
  let img = '';
  return (
    <div>
      <p>{question.serial + '. ' + question.question}</p>
      <p>{question.img ? <img src={question.img} /> : null } </p>
      { question.choices.map((choice, idx) => 
        <div key={idx}>
          <input type="radio" id={question.qid + '-' + idx} value={idx + 1} name={question.qid} onClick={() => handleSetformData((question.qid), idx+1)} />
          <label htmlFor={question.qid + '-' + idx}>{choice}</label><br/>
        </div>
      )}
    </div>
  )
};

export default QuestionItem;
