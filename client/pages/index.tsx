import React from 'react';
import { NextFC } from 'next';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStamp, faShare, faCommentAlt } from '@fortawesome/free-solid-svg-icons';
import { E_postActionType } from '../actionTypes/postType';

const index: NextFC = () => {
  return (
    <section className='Feed'>
      <main>
        <article className='new'>
          <div className='left-side'>
            <div className='profile-image'>
              <div className='image' />
            </div>
            <div />
            <div className='left-menu'>
              <div className='stamp'>
                <FontAwesomeIcon icon={faStamp} />
                <h3>243</h3>
              </div>
              <div className='commnet'>
                <FontAwesomeIcon icon={faCommentAlt} />
                <h3>12</h3>
              </div>
              <div className='share'>
                <FontAwesomeIcon icon={faShare} />
                <h3>2</h3>
              </div>
            </div>
          </div>
          <div className='right-side'>
            <div className='header'>
              <span>jo920208</span>
              <span>28.Jul</span>
              <span>~</span>
              <span>31.Jul</span>
            </div>
            <div className='content'>
              {/* <div className='title'>
                <span>No Japan!</span>
              </div> */}
              <div className='text'>
                <span>I'm not going to buy Japanese products !</span>
              </div>
              <div className='image'>
                <img src='https://www.almanac.com/sites/default/files/styles/primary_image_in_article/public/image_nodes/summer-heat-fan.jpg?itok=nzeudR0Q' />
              </div>
            </div>
          </div>
        </article>
      </main>
    </section>
  );
};

index.getInitialProps = async context => {
  const { store, isServer } = context as any;
  const cookie = isServer ? context.req.headers.cookie : '';

  if (isServer && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }

  store.dispatch({
    type: E_postActionType.LOAD_POST_REQUEST
  });
};

export default index;

{
  /* <article>
  <header>
    <div className='profileImage'>
      <div className='image' />
    </div>
    <div className='profileName'>
      <span>jo920208</span>
    </div>
    <div className='period'>
      <span>20. Jul</span>
      <span>~</span>
      <span>29. Jul</span>
    </div>
  </header>
  <div className='cover'>
    <div className='title'>
      <span>No Japan ! </span>
    </div>
    <div className='content'>I will complete SOS web app!</div>
    <div className='image'>
      <img src='https://www.almanac.com/sites/default/files/styles/primary_image_in_article/public/image_nodes/summer-heat-fan.jpg?itok=nzeudR0Q' />
    </div>
  </div>
  <footer>
    <div className='like'>도장 12개</div>
    <div className='comment-container'>
      <div className='comment-line'>
        <div className='comment-left'>
          <div className='comment-user-id'>
            <span>jo1231</span>
          </div>
          <div className='comment-content'>
            <span>Cheer up!</span>
          </div>
        </div>
        <div className='comment-like'>
          <FontAwesomeIcon icon={faStamp} />
        </div>
      </div>
    </div>
    <div className='reply'>
      <div className='input-form'>
        <input type='text' placeholder='상소 올리기...' />
      </div>
      <div className='button-form'>
        <button>
          <FontAwesomeIcon icon={faPenSquare} size='2x' />
        </button>
      </div>
    </div>
  </footer>
</article> */
}
