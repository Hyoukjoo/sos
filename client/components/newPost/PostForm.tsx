import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../hook_utils/useInput';
import PreviewImages from '../utils/PreviewImages';

import I_state from '../../redux/rootType';
import { E_postType } from '../../redux/post/postType';

import DayPicker from 'react-day-picker';
import TimePicker from 'react-times';

const PostForm: React.FC = () => {
  const dispatch = useDispatch();

  const [clickStartTime, setClickStartTime] = useState(false);
  const [clickFinishTime, setClickFinishTime] = useState(false);

  const [cnContent, setCnContent] = useState('text-content');
  const [cnStartTime, setCnStartTime] = useState(null);
  const [cnFinishTime, setCnFinishTime] = useState(null);

  const [startDay, setStartDay] = useState(new Date());
  const [finishDay, setFinishDay] = useState(new Date());
  const [beforeDay, setBeforeDay] = useState(null);

  const [startTime, setStratTime] = useState({ hour: 0o0, minute: 0o0 });
  const [finishTime, setFinishTime] = useState({ hour: 0o0, minute: 0o0 });

  const [selectedStartTime, setSelectedStartTime] = useState(`00:00`);
  const [selectedFinishTime, setSelectedFinishTime] = useState(`00:00`);

  const [content, resetContent, onChangeContent] = useInput('');

  const [isImage, setIsImage] = useState(false);
  const [imageURL, setImageURL] = useState(null);
  const [image, setImage] = useState(null);

  const { profile } = useSelector((state: I_state) => state);

  useEffect(() => {
    if (!clickStartTime && !clickFinishTime) setCnContent('text-content');
    else setCnContent('time-content');

    if (clickStartTime) {
      setCnStartTime('selected-start-time');
      setCnFinishTime(null);
    } else if (clickFinishTime) {
      setCnStartTime(null);
      setCnFinishTime('selected-finish-time');
    } else {
      setCnStartTime(null);
      setCnFinishTime(null);
    }
  }, [clickStartTime, clickFinishTime]);

  const handleClickStartTime = useCallback(() => {
    setClickFinishTime(false);
    if (clickStartTime) {
      setClickStartTime(false);
    } else {
      setClickStartTime(true);
    }
  }, [clickStartTime]);

  const handleClickFinishTime = useCallback(() => {
    setClickStartTime(false);
    if (clickFinishTime) {
      setClickFinishTime(false);
    } else {
      setClickFinishTime(true);
    }
  }, [clickFinishTime]);

  const handleStartDay = day => {
    setStartDay(day);
    setBeforeDay(day);
  };

  const handleFinsihDay = day => {
    setFinishDay(day);
  };

  const handleStartTime = time => {
    setSelectedStartTime(`${time.hour}:${time.minute}`);
    setStratTime(time);
  };

  const handleFinishTime = time => {
    setSelectedFinishTime(`${time.hour}:${time.minute}`);
    setFinishTime(time);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsImage(true);
    setImageURL(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const deleteImage = () => {
    setIsImage(false);
    setImageURL(null);
    setImage(null);
  };

  const onSubmit = useCallback(() => {
    const data = new FormData();

    const startDate = new Date(
      startDay.getFullYear(),
      startDay.getMonth(),
      startDay.getDate(),
      startTime.hour,
      startTime.minute,
      0o0
    ).toString();

    const finishDate = new Date(
      finishDay.getFullYear(),
      finishDay.getMonth(),
      finishDay.getDate(),
      finishTime.hour,
      finishTime.minute,
      0o0
    ).toString();

    data.append('content', content);
    data.append('startTime', startDate);
    data.append('finishTime', finishDate);
    data.append('image', image);

    if (image === null && (content as string).trim().length < 1) alert('No informations');
    else if (confirm('Are you post it?')) {
      dispatch({
        type: E_postType.NEW_POST_REQUEST,
        data: data
      });

      clear();
    }
  }, [startTime, finishTime, content, image]);

  const clear = () => {
    dispatch({
      type: E_postType.SHOW_NEW_POST
    });
  };

  return (
    <main id='Post-form'>
      <div className='container'>
        <div className='button-container'>
          <div className='cancel-button'>
            <button onClick={clear}>
              <i className='material-icons'>clear</i>
            </button>
          </div>
          <div />
          <div className='submit-button' onClick={onSubmit}>
            <button>POST</button>
          </div>
        </div>

        <div className='post-container'>
          <header>
            {profile.profileImage ? (
              <div className='profile-image'>
                <img src={`http://localhost:4000/${profile.profileImage}`} alt='' />
              </div>
            ) : (
              <div className='empty-profile-image'></div>
            )}
            <div className='profile-name'>jo920208</div>
            <div className='period'>
              <div className='start-time'>
                <button onClick={handleClickStartTime} className={cnStartTime}>
                  <i className='material-icons opposite'>keyboard_tab</i>
                </button>
              </div>
              <div className='finish-time'>
                <button onClick={handleClickFinishTime} className={cnFinishTime}>
                  <span>
                    <i className='material-icons'>keyboard_tab</i>
                  </span>
                </button>
              </div>
            </div>
          </header>

          <div className={cnContent}>
            <textarea className={cnContent} onChange={onChangeContent} />
            {clickStartTime && (
              <div className='time-container'>
                <div>
                  <DayPicker onDayClick={handleStartDay} selectedDays={startDay} />
                </div>
                <div className='time-picker'>
                  <TimePicker theme='classic' onTimeChange={handleStartTime} time={selectedStartTime} />
                </div>
              </div>
            )}
            {clickFinishTime && (
              <div className='time-container'>
                <div>
                  <DayPicker
                    onDayClick={handleFinsihDay}
                    selectedDays={finishDay}
                    disabledDays={{ before: beforeDay }}
                  />
                </div>
                <div className='time-picker'>
                  <TimePicker theme='classic' onTimeChange={handleFinishTime} time={selectedFinishTime} />
                </div>
              </div>
            )}
          </div>

          {isImage && (
            <div className='image-container'>
              <PreviewImages image={imageURL} />
            </div>
          )}

          <footer>
            <div className='sub-menu'>
              <div className='upload-image'>
                <label htmlFor='file'>
                  <span>
                    <i className='material-icons'>add_photo_alternate</i>
                  </span>
                  <input
                    type='file'
                    id='file'
                    onChange={handleImage}
                    onClick={e => {
                      e.currentTarget.value = null;
                    }}
                  />
                </label>
              </div>
              {/* <div className='place'>
                <span>
                  <i className='material-icons'>location_searching</i>
                </span>
              </div>
              <div className='friend'>
                <span>
                  <i className='material-icons'>how_to_reg</i>
                </span>
              </div> */}
            </div>
            {isImage && (
              <div className='delete-button' onClick={deleteImage}>
                <button>delete</button>
              </div>
            )}
          </footer>
        </div>
      </div>
    </main>
  );
};

export default PostForm;
