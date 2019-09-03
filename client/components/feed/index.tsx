import React from 'react';

const Feed: React.FC = () => {
  return (
    <main className='Feed'>
      <article>
        <header>
          <div className='profile-image'>
            <div className='image' />
          </div>
          <div className='profile-name'>
            <span>jo920208</span>
          </div>
          <div className='period'>
            <span>20 Aug / 31 Aug</span>
          </div>
        </header>
        <div className='cover'>
          <div className='content'>
            <span>I will complete sealrock!</span>
          </div>
        </div>
        <div className='image'>
          <img src='https://www.almanac.com/sites/default/files/styles/primary_image_in_article/public/image_nodes/summer-heat-fan.jpg?itok=nzeudR0Q' />
        </div>
        <footer>
          <div className='like-button'>
            <span>like 12</span>
          </div>
          <div className='reply-button'>
            <span>reply 3 </span>
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
    </main>
  );
};

export default Feed;