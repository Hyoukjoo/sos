import React from 'react';

import { I_postData } from '../../../redux/rootType';
import monthArr from '../../utils/month';

import { serverImageURL } from '../../../info/url';

interface I_props {
  postDatas: I_postData[];
}

const Posts: React.FC<I_props> = ({ postDatas }) => {
  return (
    <div id='Posts'>
      {postDatas &&
        postDatas.map(postData => {
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
              <img src={`${serverImageURL}${postData.postImage[0].src}`} alt='' />
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
