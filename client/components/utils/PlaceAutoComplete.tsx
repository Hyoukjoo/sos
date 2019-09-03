import React, { useState, useCallback, useEffect } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { useDispatch } from 'react-redux';
import { E_postActionType } from '../../actionTypes/postType';

const PlaceAutocomplete = () => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [resultAddress, setResultAddress] = useState('');

  const stopKeydownEventHandler = (e: KeyboardEvent) => {
    if (e.keyCode === 13 || (e.keyCode >= 37 && e.keyCode <= 40)) {
      e.stopImmediatePropagation();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', stopKeydownEventHandler, true);
    return () => document.removeEventListener('keydown', stopKeydownEventHandler);
  }, []);

  //TODO: 키보드로 이동해서 값 입력했을 때 input tag에 보여지는 값과 저장되는 값을 마우스 클릭했을 때와 일치시키기
  const onChangePlace = useCallback((inputAddress: string) => {
    setAddress(inputAddress);
    // setResultAddress(inputAddress);
  }, []);

  const onSelectPlace = useCallback(
    (address: string) => {
      setAddress(resultAddress);
      dispatch({
        type: E_postActionType.LOAD_PLACE_DATA,
        data: resultAddress
      });
    },
    [resultAddress]
  );

  const onMouseOverPlaceResult = useCallback((e: React.MouseEvent<HTMLDivElement>, suggenstion) => {
    const { innerText } = e.currentTarget;
    setResultAddress(innerText);
  }, []);

  const replaceDotToSpace = useCallback((text: string): string => {
    let result = text;
    let isIncludeDot = text.includes('.');
    while (isIncludeDot) {
      result = result.replace('.', ' ');
      isIncludeDot = result.includes('.');
    }
    return result;
  }, []);

  return (
    <PlacesAutocomplete value={address} onChange={onChangePlace} onSelect={onSelectPlace}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input'
            })}
          />
          <div className='autocomplete-dropdown-container'>
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
              const style = suggestion.active
                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                : { backgroundColor: '#ffffff', cursor: 'pointer' };
              const description = suggestion.description.substr(suggestion.matchedSubstrings[0].offset);
              const result = replaceDotToSpace(description);
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style
                  })}
                  onMouseOver={e => onMouseOverPlaceResult(e, suggestion)}
                >
                  <span>{result}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default PlaceAutocomplete;
