import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NextFunctionComponent } from 'next';

import { useInput } from '../hook_utils/useInput';
import { ISchedule } from '../actionTypes/addType';

const add: NextFunctionComponent = () => {
  const images = useInput('');
  const title = useInput('');
  const start_time = useInput('');
  const end_time = useInput('');
  const location = useInput('');
  const privacy_bounds = useInput('');

  const addScheduleData: ISchedule = {
    images: images.value,
    title: title.value,
    start_time: start_time.value,
    end_time: end_time.value,
    location: location.value,
    privacyBounds: privacy_bounds.value
  };

  const dispatch = useDispatch();

  return (
    <div className='addContainer'>
      <div className='add_image'>
        <label>
          images: <input type='text' {...images} />
        </label>
      </div>
      <div className='add_title'>
        <label>
          title: <input type='text' {...title} />
        </label>
      </div>
      <div className='add_start_Time'>
        <label>
          start_time: <input type='text' {...start_time} />
        </label>
      </div>
      <div className='add_end_Time'>
        <label>
          end_time: <input type='text' {...end_time} />
        </label>
      </div>
      <div className='add_location'>
        <label>
          location: <input type='text' {...location} />
        </label>
      </div>
      <div className='add_privacy_bounds'>
        <label>
          privacy_bounds: <input type='text' {...privacy_bounds} />
        </label>
      </div>
      <div className='add_submit'>
        <button>ADD</button>
      </div>
    </div>
  );
};

export default add;
