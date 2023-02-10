const AnswerAnalysis = ({ analysis }) => {
  const digMap = {1: 'a', 2: 'b', 3: 'c', 4: 'd'}
  return (
    <div>
      <h2>Your Answers</h2>
      { analysis.map((question) => 
        <div key={question.qid}>
          <p>{question.serial + '. ' + question.question}</p>
          <p>{question.img ? <img src={question.img} /> : null } </p>
          <ol className="answer-list">
            { question.choices.map((choice, idx) => 
                <li key={idx}>{choice}</li>
            )}
          </ol>
          <span className={question.response === question.answer ? "answer-right" : "answer-wrong"}>
            {question.response === question.answer ? "✓ " : "✕ " }
          </span>
          { question.response === question.answer ? "You have correctly answered: " + digMap[question.response] : "Your answer: " + digMap[question.response] + ', correct answer: ' + digMap[question.answer] }
        </div>
      )}
    </div>
  )
};

export default AnswerAnalysis;
