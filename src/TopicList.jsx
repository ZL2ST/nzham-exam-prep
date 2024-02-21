import ActionButton from './ActionButton'
import { useState } from "react"
import ExamTopic from './ExamTopic'

const TopicList = ({ questionBank, handleSplashButtonClick }) => {
  const [slug, setSlug] = useState('regulations');
  const [examTopicVisible, setExamTopicVisible] = useState(false);
  const [topicListVisible, setTopicListVisible] = useState(true);

  const handleTopicExamButtonClick = () => {
    setExamTopicVisible(true);
    setTopicListVisible(false);
  }

  const handleTopicChange = (e) => {
    setSlug(e.target.value);
  };

  return (
    <div>
      { topicListVisible &&
        <>
          <h2>Choose a topic</h2>
          <form>
          <select className='topic-dropdown' value={slug} onChange={handleTopicChange}>
            { questionBank.map((topic) => 
                <option key={topic.slug} value={topic.slug}>{topic.topic}</option>
            )}
          </select>
          </form>
          <br/>
          <ActionButton action={handleTopicExamButtonClick} label='Start test in topic' />&nbsp;
          <ActionButton action={handleSplashButtonClick} label='Return to main menu' />
        </>
      }
      { examTopicVisible && <ExamTopic questionBank={questionBank} slug={slug} handleSplashButtonClick={handleSplashButtonClick} /> }
    </div>
  )
};

export default TopicList;
