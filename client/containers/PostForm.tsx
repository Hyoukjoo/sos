import React, { useState, useCallback } from 'react';
import DayPicker from 'react-day-picker';
import '../scss/day-picker.css';

import TimePicker from 'react-times';
import '../scss/css/classic/default.css';
import '../scss/css/material/default.css';

const PostForm: React.FC = () => {
  return (
    <main className='PostForm'>
      <div className='container'>
        <div className='cancel-button'>
          <button>X</button>
        </div>
        <div className='post-container'>
          <header>
            <div className='profile-image' />
            <div className='profile-name'>jo920208</div>
            <div className='period'>
              <div className='start-time'>
                <button>
                  <span>START</span>
                </button>
              </div>
              <div className='finish-time'>
                <button>
                  <label>
                    <span>FINISH</span>
                  </label>
                </button>
              </div>
            </div>
          </header>
          <div className='content'>
            <textarea />
            <DayPicker />
          </div>
          <div style={{ width: '274px', justifySelf: 'end', paddingRight: '10px' }}>
            <TimePicker theme='classic' />
          </div>

          <footer>
            <div className='sub-menu'>
              <div className='upload-image'>
                <span>image</span>
              </div>
              <div className='place'>
                <span>place</span>
              </div>
              <div className='friend'>
                <span>friend</span>
              </div>
              <div className='group'>
                <span>group</span>
              </div>
            </div>
            <div className='submit-button'>
              <button>POST</button>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
};

export default PostForm;
