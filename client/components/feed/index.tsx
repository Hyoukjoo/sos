import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../hook_utils/useInput';
import monthArr from '../utils/month';

import I_state, { I_postData } from '../../redux/rootType';
import { E_postType } from '../../redux/post/postType';

interface I_props {
  postDatas: I_postData[];
}

const Feed: React.FC<I_props> = ({ postDatas }) => {
  const dispatch = useDispatch();

  const { userId } = useSelector((state: I_state) => state.user.myInfo);
  const { currentReplyPostId } = useSelector((state: I_state) => state.post);

  const [comment, resetComment, onChangeComment] = useInput('');

  const showLikeList = postData => {
    dispatch({
      type: E_postType.SHOW_LIKE_LIST,
      data: { postData }
    });
  };

  const clickLike = postId => {
    dispatch({
      type: E_postType.POST_LIKE_REQUEST,
      data: { postId }
    });
  };

  const clickUnLike = postId => {
    dispatch({
      type: E_postType.POST_UNLIKE_REQUEST,
      data: { postId }
    });
  };

  const showReplyList = postData => {
    dispatch({
      type: E_postType.SHOW_REPLY_LIST,
      data: { postData }
    });
  };

  const showReplyInput = postId => {
    resetComment();

    dispatch({
      type: E_postType.SHOW_REPLY_INPUT,
      data: { postId }
    });
  };

  const submitReply = postId => {
    resetComment();

    dispatch({
      type: E_postType.POST_REPLY_REQUEST,
      data: { postId, comment }
    });

    dispatch({
      type: E_postType.SHOW_REPLY_INPUT,
      data: { postId }
    });
  };

  const deletePost = postId => {
    if (confirm('Delete this post?')) {
      dispatch({
        type: E_postType.DELETE_POST_REQUEST,
        data: { postId }
      });
    }
  };

  return (
    <main className='Feed'>
      {postDatas &&
        postDatas.map(postData => {
          const startDate = new Date(Date.parse(postData.startTime));
          const finishDate = new Date(Date.parse(postData.finishTime));
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

          const [isLike] = postData.postLike.filter(v => v.userId === userId);
          const isMyPost = postData.userId === userId;

          const isReplyInput = postData.postId === currentReplyPostId;

          return (
            <article key={postData.postId}>
              <header>
                <div className='profile-image'>
                  <div className='image'>
                    <img src={`http://localhost:4000/${postData.userPost.userProfile.profileImage}`} alt='' />
                  </div>
                </div>
                <div className='profile-name'>
                  <span>{postData.userPost.userProfile.userName}</span>
                </div>
                <div className='period'>
                  <span>{formatDate}</span>
                </div>
              </header>
              <div className='cover'>
                <div className='content'>
                  <span>{postData.content}</span>
                </div>
              </div>
              <div className='image'>
                {postData.postImage[0] && <img src={`http://localhost:4000/${postData.postImage[0].src}`} />}
              </div>
              <footer>
                <div className='button-div'>
                  {isLike ? (
                    <div onClick={() => clickUnLike(postData.postId)}>
                      <i className='material-icons like'>favorite_border</i>
                    </div>
                  ) : (
                    <div onClick={() => clickLike(postData.postId)}>
                      <i className='material-icons unLike'>favorite_border</i>
                    </div>
                  )}
                  <span onClick={() => showLikeList(postData)}>{postData.postLike.length}</span>
                </div>
                <div className='button-div'>
                  <div>
                    <i className='material-icons md-light' onClick={() => showReplyInput(postData.postId)}>
                      sms
                    </i>
                  </div>
                  <span onClick={() => showReplyList(postData)}>{postData.postReply.length}</span>
                </div>
                <div className='delete-container'>
                  {isMyPost && (
                    <i onClick={() => deletePost(postData.postId)} className='material-icons'>
                      delete_outline
                    </i>
                  )}
                </div>
              </footer>
              {isReplyInput && (
                <div className='reply'>
                  <div className='input-form'>
                    <input type='text' placeholder='Add a comment...' value={comment} onChange={onChangeComment} />
                  </div>
                  <div className='button-form'>
                    <button onClick={() => submitReply(postData.postId)}>Reply</button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
    </main>
  );
};

export default Feed;
