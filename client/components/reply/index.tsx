import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { E_postActionType } from '../../actionTypes/postType';
import I_state from '../../actionTypes';
import useInput from '../../hook_utils/useInput';

const Reply: React.FC = () => {
  const dispatch = useDispatch();

  const { userId } = useSelector((state: I_state) => state.user.myInfo);

  //댓글을 지웠을 때 업데이트 된 정보를 보여주기 위해서 postData를 가지고 옴
  const { postData } = useSelector((state: I_state) => state.post);
  const curerntPostDataId = useSelector((state: I_state) => state.post.currentPostData.postId);
  const [currentPostData] = postData.filter(v => v.postId === curerntPostDataId);

  const [comment, resetComment, onChangeComment] = useInput('');

  const useOutsideClikc = (ref: React.MutableRefObject<HTMLDivElement>) => {
    const handleClickOutside = e => {
      if (ref.current === e.target) {
        dispatch({
          type: E_postActionType.SHOW_REPLY_LIST
        });
      }
    };

    useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    });
  };

  const clearReply = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({
      type: E_postActionType.SHOW_REPLY_LIST
    });
  };

  const deleteReply = (postId, id) => {
    dispatch({
      type: E_postActionType.POST_DELETE_REPLY_REQUEST,
      data: { postId, id }
    });
  };

  const submitReply = (postId, e: React.MouseEvent<HTMLButtonElement>) => {
    resetComment();

    dispatch({
      type: E_postActionType.POST_REPLY_REQUEST,
      data: { postId, comment }
    });
  };

  const wrappedRef = useRef(null);

  useOutsideClikc(wrappedRef);

  return (
    <div ref={wrappedRef} id='Reply'>
      <div className='reply-container'>
        <header>
          <div className='left'></div>
          <div className='center'>
            <span>Reply</span>
          </div>
          <div className='right'>
            <i className='material-icons' onClick={clearReply}>
              clear
            </i>
          </div>
        </header>
        <div className='reply-list-container'>
          {currentPostData.postReply.map(v => {
            const isMyReply = v.userId === userId;

            return (
              <div className='reply-list' key={v.id + v.userId}>
                <div className='profile-image'>
                  {v.replyUserProfile.profileImage ? (
                    <img src={`http://localhost:4000/${v.replyUserProfile.profileImage}`} alt='' />
                  ) : (
                    <div className='empty-profile-image'></div>
                  )}
                </div>
                <div className='comment-container'>
                  <span className='username'>{v.replyUserProfile.userName}</span>
                  <span className='comment'>{v.comment}</span>
                </div>
                <div className='delete-container'>
                  {isMyReply && (
                    <i onClick={() => deleteReply(currentPostData.postId, v.id)} className='material-icons'>
                      delete_outline
                    </i>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className='reply'>
          <div className='input-form'>
            <input type='text' placeholder='Add a comment...' value={comment} onChange={onChangeComment} />
          </div>
          <div className='button-form'>
            <button onClick={e => submitReply(currentPostData.postId, e)}>Reply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
