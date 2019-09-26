import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { E_postActionType } from '../../actionTypes/postType';
import I_state, { I_postData } from '../../actionTypes';
import useInput from '../../hook_utils/useInput';

interface I_props {
  postData: I_postData[];
}

const Feed: React.FC<I_props> = ({ postData }) => {
  const dispatch = useDispatch();

  const { userId } = useSelector((state: I_state) => state.user.myInfo);
  const { currentReplyPostId } = useSelector((state: I_state) => state.post);

  const [comment, resetComment, onChangeComment] = useInput('');

  const showLikeList = postData => {
    dispatch({
      type: E_postActionType.SHOW_LIKE_LIST,
      data: { postData }
    });
  };

  const clickLike = postId => {
    dispatch({
      type: E_postActionType.POST_LIKE_REQUEST,
      data: { postId }
    });
  };

  const clickUnLike = postId => {
    dispatch({
      type: E_postActionType.POST_UNLIKE_REQUEST,
      data: { postId }
    });
  };

  const showReplyList = postData => {
    dispatch({
      type: E_postActionType.SHOW_REPLY_LIST,
      data: { postData }
    });
  };

  const showReplyInput = postId => {
    resetComment();

    dispatch({
      type: E_postActionType.SHOW_REPLY_INPUT,
      data: { postId }
    });
  };

  const submitReply = postId => {
    resetComment();

    dispatch({
      type: E_postActionType.POST_REPLY_REQUEST,
      data: { postId, comment }
    });

    dispatch({
      type: E_postActionType.SHOW_REPLY_INPUT,
      data: { postId }
    });
  };

  const deletePost = postId => {
    if (confirm('Delete this post?')) {
      dispatch({
        type: E_postActionType.DELETE_POST_REQUEST,
        data: { postId }
      });
    }
  };

  return (
    <main className='Feed'>
      {postData &&
        postData.map(data => {
          const startTime = new Date(Date.parse(data.startTime));
          const finishTime = new Date(Date.parse(data.finishTime));
          const formatTime = `${startTime.getMonth() + 1}월${startTime.getDate()}일 / ${finishTime.getMonth() +
            1}월${finishTime.getDate()}일`;

          const [isLike] = data.postLike.filter(v => v.userId === userId);
          const isMyPost = data.userId === userId;

          const isReplyInput = data.postId === currentReplyPostId;

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
                  {isLike ? (
                    <div onClick={() => clickUnLike(data.postId)}>
                      <i className='material-icons like'>favorite_border</i>
                    </div>
                  ) : (
                    <div onClick={() => clickLike(data.postId)}>
                      <i className='material-icons unLike'>favorite_border</i>
                    </div>
                  )}
                  <span onClick={() => showLikeList(data)}>{data.postLike.length}</span>
                </div>
                <div className='button-div'>
                  <div>
                    <i className='material-icons md-light' onClick={() => showReplyInput(data.postId)}>
                      sms
                    </i>
                  </div>
                  <span onClick={() => showReplyList(data)}>{data.postReply.length}</span>
                </div>
                <div className='delete-container'>
                  {isMyPost && (
                    <i onClick={() => deletePost(data.postId)} className='material-icons'>
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
                    <button onClick={e => submitReply(data.postId, e)}>Reply</button>
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
