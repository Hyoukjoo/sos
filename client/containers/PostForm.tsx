import React, { useCallback, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import axios from 'axios';

import useInput from '../hook_utils/useInput';
import { E_postActionType } from '../actionTypes/postType';

import PreviewImages from '../components/PreviewImages';
import PlaceAutocomplete from '../components/PlaceAutoComplete';

import 'react-datepicker/dist/react-datepicker.css';

const PostForm = () => {
  const dispatch = useDispatch();

  const [content, resetContent, onChangeContent] = useInput('');
  const [privacyBound, resetPrivacyBound, onChangePrivacyBound] = useInput(undefined);

  const [imageURLs, setImageURLs] = useState(null);
  const [formImages, setFormImages] = useState(null);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const images = useSelector(state => (state as any).post.images);
  const place = useSelector(state => (state as any).post.loadPlaceData);

  const onChangeImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    //TODO: 업로드 버튼 눌렀다 취소했을 때 데이터 유지하기
    const imageURLsArray = [];
    const formImagesArray = [];

    //TODO: 배열 불변성 유지하기
    //TODO: useState를 사용하기, new FormData를 컴포넌트에서 생성하면 에러가 발생 (FormData is not defined)
    //TODO: IMAGE 확장자를 통해 유효성 검사하기
    [].forEach.call(e.target.files, file => {
      imageURLsArray.push(URL.createObjectURL(file));
      formImagesArray.push(file);
    });

    setImageURLs(imageURLsArray);
    setFormImages(formImagesArray);
  }, []);

  const onPost = useCallback(() => {
    const formData = new FormData();

    if (formImages) {
      [].forEach.call(formImages, image => {
        formData.append('images', image);
      });
    }

    formData.append('content', content);
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);
    formData.append('place', place);
    formData.append('privacyBound', privacyBound);

    dispatch({
      type: E_postActionType.NEW_POST_REQUEST,
      data: formData
    });
  }, [content, formImages, startTime, endTime, place, privacyBound]);

  const onTest = useCallback(async () => {
    const result = await axios.get('http://localhost:4000/post/', { withCredentials: true });
    console.log(result);
  }, []);

  return (
    <div className='addContainer'>
      <PreviewImages images={imageURLs} />
      <div className='add_image'>
        <label>
          images: <input type='file' multiple onChange={onChangeImage} />
        </label>
      </div>
      <div className='add_title'>
        <label>
          content:{' '}
          <div className='wrapper'>
            <input type='text' onChange={onChangeContent} value={content} />
          </div>
        </label>
      </div>
      {/* HINT: CUSTOM INPUT으로 INPUT에다가 표현 가능, customInput - property, 나중에 커스터마이징 하기  */}
      <div className='add_start_Time'>
        <label>
          start_time:
          <DatePicker
            selected={startTime}
            onChange={time => setStartTime(time)}
            showTimeSelect
            timeFormat='HH:mm'
            dateFormat='yyyy/M/d h:mm aa'
            timeCaption='time'
            placeholderText='start time!'
          />
        </label>
      </div>
      <div className='add_end_Time'>
        <label>
          end_time:{' '}
          <DatePicker
            selected={endTime}
            onChange={time => setEndTime(time)}
            showTimeSelect
            timeFormat='HH:mm'
            dateFormat='yyyy/M/d h:mm aa'
            timeCaption='time'
            placeholderText='end time!'
          />
        </label>
      </div>
      <div className='add_location'>
        <label>
          place: <PlaceAutocomplete />
        </label>
      </div>
      <div className='add_privacy_bounds'>
        <label>
          privacy_bound: <input type='text' value={privacyBound} onChange={onChangePrivacyBound} />
        </label>
      </div>
      <div className='add_submit'>
        <button onClick={onPost}>ADD</button>
        <button onClick={onTest}>TEST</button>
      </div>
    </div>
  );
};

export default PostForm;
