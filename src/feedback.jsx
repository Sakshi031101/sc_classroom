import React, {useContext, useEffect, useState} from 'react';
import { FeedbackFormContext } from '../../pages/announcement/Announcement';

export const Feedback = ({postId}) => {

  const {feedbackFormStatus, setStatus} = useContext(FeedbackFormContext);
  const [isFeedbackSent, setFeedbackSent] = useState(()=> retriveStoredData('feedback')||false);

    useEffect(() => {
      const currentVal = JSON.parse(sessionStorage.getItem(postId));
      setFeedbackSent(currentVal && currentVal.feedback !== undefined);

    }, [feedbackFormStatus]);

    function retriveStoredData(key){
      const storedValue = JSON.parse(sessionStorage.getItem(postId))
      if (storedValue === null || storedValue[key] === undefined){
        return null
      }
      return storedValue[key];
    }


    function handleFeedbackClick(){
      setStatus({...feedbackFormStatus, postId:postId, isVisible:true})
    }

  return (
  <div>

    <button onClick={handleFeedbackClick}>
      <i className={`${isFeedbackSent?'fas':'far'} fa-comment blue`}></i>
      <span style={{padding:'0 5px'}}>{isFeedbackSent? 'Feedback Sent':'Send Feedback'}</span>
    </button>


  </div>);
};
