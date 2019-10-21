import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { E_postType } from '../../redux/post/postType';
import I_state from '../../redux/rootType';
import useInput from '../../hook_utils/useInput';

const Reply: React.FC = () => {
  const dispatch = useDispatch();

  const { userId } = useSelector((state: I_state) => state.user.myInfo);

  //댓글을 지웠을 때 업데이트 된 정보를 보여주기 위해서 postData를 가지고 옴
  const { postDatas } = useSelector((state: I_state) => state.post);
  const curerntPostDataId = useSelector((state: I_state) => state.post.currentPostData.postId);
  const [currentPostData] = postDatas.filter(v => v.postId === curerntPostDataId);

  const [comment, resetComment, onChangeComment] = useInput('');

  const useOutsideClikc = (ref: React.MutableRefObject<HTMLDivElement>) => {
    const handleClickOutside = e => {
      if (ref.current === e.target) {
        dispatch({
          type: E_postType.SHOW_REPLY_LIST
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
      type: E_postType.SHOW_REPLY_LIST
    });
  };

  const deleteReply = (postId, id) => {
    if (confirm('Delete reply?'))
      dispatch({
        type: E_postType.POST_DELETE_REPLY_REQUEST,
        data: { postId, id }
      });
  };

  const submitReply = (postId, e: React.MouseEvent<HTMLButtonElement>) => {
    resetComment();

    dispatch({
      type: E_postType.POST_REPLY_REQUEST,
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
                  <Link href={{ pathname: '/user', query: { id: v.userId } }} as={`/user/${v.userId}`}>
                    <a onClick={clearReply}>
                      {v.replyUserProfile.profileImage ? (
                        <img src={`http://localhost:4000/${v.replyUserProfile.profileImage}`} alt='' />
                      ) : (
                        <div className='empty-profile-image'></div>
                      )}
                    </a>
                  </Link>
                </div>
                <div className='comment-container'>
                  <Link href={{ pathname: '/user', query: { id: v.userId } }} as={`/user/${v.userId}`}>
                    <a onClick={clearReply}>
                      <span className='username'>{v.replyUserProfile.userName}</span>
                    </a>
                  </Link>
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
