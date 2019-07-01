import { I_postAction, E_postActionType } from '../actionTypes/postType';
import { string } from 'prop-types';

const InitialState = {
  loadPlaceData: '',
  images: ''
};

const postReducer = (state = InitialState, action: I_postAction) => {
  switch (action.type) {
    case E_postActionType.ADD_POST_REQUEST:
      return { ...state };
    case E_postActionType.ADD_POST_SUCCESS:
      return { ...state, images: action.data.images };
    case E_postActionType.ADD_POST_FAILURE:
      return { ...state };
    case E_postActionType.LOAD_PLACE_DATA:
      return { ...state, loadPlaceData: action.data };
    default:
      return { ...state };
  }
};

export default postReducer;
