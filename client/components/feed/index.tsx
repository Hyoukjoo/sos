import React from 'react';
import { useRouter } from 'next/router';

interface I_props {
  postData: [
    {
      postId: number;
      authorId: string;
      content: string;
      startTime: string;
      finishTime: string;
      privacyBound: string;
      userPost: { userId: string; userProfile: { userName: string; profileImage: string } };
      postImage: [{ id: number; postId: number; src: string }];
      postLike: [];
      postReply: [];
    }
  ];
}

const Feed: React.FC<I_props> = ({ postData }) => {
  const router = useRouter();
  console.log(router);
  return (
    <main className='Feed'>
      {postData &&
        postData.map(data => {
          const startTime = new Date(Date.parse(data.startTime));
          const finishTime = new Date(Date.parse(data.finishTime));
          const formatTime = `${startTime.getMonth() + 1}월${startTime.getDate()}일 / ${finishTime.getMonth() +
            1}월${finishTime.getDate()}일`;
          console.log(data);
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
                <div className='like-button'>
                  <span>like {data.postLike.length}</span>
                </div>
                <div className='reply-button'>
                  <span>reply {data.postReply.length}</span>
                </div>
                <div className='option-button'>
                  <span>...</span>
                </div>
              </footer>
              {/* <div className='reply'>
              <div className='input-form'>
                <input type='text' placeholder='댓글 쓰기...' />
              </div>
              <div className='button-form'>
                <button>
                  <FontAwesomeIcon icon={faPenSquare} size='2x' />
                </button>
              </div>
            </div> */}
            </article>
          );
        })}
    </main>
  );
};

export default Feed;
