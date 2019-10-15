import React from 'react';

import { I_postData, I_follow } from '../../../redux/rootType';
import monthArr from '../../utils/month';

interface I_props {
  myPostDatas: I_postData[];
}

const Posts: React.FC<I_props> = ({ myPostDatas }) => {
  return (
    <div id='Posts'>
      {myPostDatas &&
        myPostDatas.map(postData => {
          const startDate = new Date(postData.startTime);
          const finishDate = new Date(postData.finishTime);

          let formatDate = null;
          if (
            startDate.getFullYear() === finishDate.getFullYear() &&
            startDate.getMonth() === finishDate.getMonth() &&
            startDate.getDate() === finishDate.getDate()
          )
            formatDate = `${monthArr[startDate.getMonth()]} ${startDate.getDate()}`;
          else
            formatDate = `${monthArr[startDate.getMonth()]} ${startDate.getDate()}  
        / ${monthArr[finishDate.getMonth()]} ${finishDate.getDate()} `;

          return (
            <div className='post-container' key={postData.postId}>
              <img src={`http://localhost:4000/${postData.postImage[0].src}`} alt='' />
              <div className='info-container'>
                <span>{formatDate}</span>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Posts;
