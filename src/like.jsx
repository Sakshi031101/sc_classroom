import React, {useState, useEffect, useRef} from 'react';

export const Like = ({postId, givenLikes}) => {

  const [likes, changeLikes] = useState(()=> retriveStoredData('likes')||givenLikes||0);
  const [liked, toggleLike] = useState(() => retriveStoredData('liked')||-1);
  const firstUpdate = useRef(true);

  useEffect(() => {
    let newLikes = likes;


    if (firstUpdate.current){
      firstUpdate.current = false;
    }
    else{
      newLikes = Math.max(likes+liked, 0);
      changeLikes(newLikes);
    }

    const currentVal = JSON.parse(sessionStorage.getItem(postId))||{};
    sessionStorage.setItem(postId, JSON.stringify({...currentVal, likes:newLikes, liked:liked}));
  }, [liked, postId]);

  function retriveStoredData(key){
    const storedValue = JSON.parse(sessionStorage.getItem(postId))
    if (storedValue === null || storedValue[key] === undefined){
      return null
    }
    return storedValue[key];
  }

  return (
  <div>

    <button onClick={()=>toggleLike(liked===-1?1:-1)}>
      <i className={`${liked===-1?'far':'fas'} fa-thumbs-up blue`}></i>
      <span style={{padding:'0 10px'}}>{likes}</span>
    </button>


  </div>);
};
