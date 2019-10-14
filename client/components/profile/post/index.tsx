import React from 'react';

import { I_postData } from '../../../redux/rootType';
import monthArr from '../../utils/month';

interface I_props {
  userId: string;
  postDatas: I_postData[];
}

const Posts: React.FC<I_props> = ({ userId, postDatas }) => {
  const myPostDatas = postDatas.filter(postdata => postdata.userId === userId);

  return (
    <div id='Posts'>
      {myPostDatas.map(postData => {
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
          <div className='post-container'>
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
