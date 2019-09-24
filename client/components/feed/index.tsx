import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { E_postActionType } from '../../actionTypes/postType';
import { I_postData } from '../../actionTypes';

interface I_props {
  postData: I_postData[];
}

const Feed: React.FC<I_props> = ({ postData }) => {
  const dispatch = useDispatch();

  const userId = useSelector((state: any) => state.user.myInfo.userId);

  const handleLikes = (postData: I_postData) => {
    dispatch({
      type: E_postActionType.SHOW_LIKES,
      data: { postData }
    });
  };

  const clickLike = (postId: number) => {
    dispatch({
      type: E_postActionType.POST_LIKE_REQUEST,
      data: { postId }
    });
  };

  return (
    <main className='Feed'>
      {postData &&
        postData.map(data => {
          const startTime = new Date(Date.parse(data.startTime));
          const finishTime = new Date(Date.parse(data.finishTime));
          const formatTime = `${startTime.getMonth() + 1}월${startTime.getDate()}일 / ${finishTime.getMonth() +
            1}월${finishTime.getDate()}일`;
          return (
            <article key={data.postId}>
              <header>
                <div className='profile-image'>
                  <div className='image'>
                    <img src={`http://localhost:4000/${data.userPost.userProfile.profileImage}`} alt='' />
                  </div>
                </div>
                <div className='profile-name'>
                  <span>{data.userPost.userProfile.userName}</span>
                </div>
                <div className='period'>
                  <span>{formatTime}</span>
                </div>
              </header>
              <div className='cover'>
                <div className='content'>
                  <span>{data.content}</span>
                </div>
              </div>
              <div className='image'>
                {data.postImage[0] && <img src={`http://localhost:4000/${data.postImage[0].src}`} />}
              </div>
              <footer>
                <div className='button-div'>
                  <div onClick={() => clickLike(data.postId)}>
                    <i className='material-icons '>favorite_border</i>
                  </div>
                  <span onClick={() => handleLikes(data)}>{data.postLike.length}</span>
                </div>
                <div className='button-div'>
                  <div>
                    <i className='material-icons md-light'>sms</i>
                  </div>
                  <span>{data.postReply.length}</span>
                </div>
                <div className='option-button'>
                  <span>...</span>
                </div>
              </footer>
              {/* <div className='reply'>
                <div className='input-form'>
                  <input type='text' placeholder='Add a comment...' />
                </div>
                <div className='button-form'>
                  <button></button>
                </div>
              </div> */}
            </article>
          );
        })}
    </main>
  );
};

export default Feed;
