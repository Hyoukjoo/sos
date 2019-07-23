import React from 'react';
import { NextFunctionComponent } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';

const index: NextFunctionComponent = () => {
  return (
    <main className='Feed'>
      <section>
        <article>
          {/* <header>
            <div className='profileImage'>
              <div className='image' />
            </div>
            <div className='profileName'>
              <div className='userName'>jo920208</div>
            </div>
            <div className='search' />
            <div className='period'>
              <div className='start'>
                <span>20. Jul</span>
              </div>
              <div className='wave'>
                <span>~</span>
              </div>
              <div className='finish'>
                <span>29. Jul</span>
              </div>
            </div>
          </header> */}
          <div className='cover'>
            <div className='title'>
              <span>해보자꾸나 ! </span>
            </div>
          </div>
          <footer>
            <div className='like'>도장 12개</div>
            <div className='content'>I will complete SOS web app!</div>
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
        </article>
      </section>
    </main>
  );
};

index.getInitialProps = async context => {};

export default index;
