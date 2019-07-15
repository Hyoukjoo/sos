import { I_postAction, E_postActionType } from '../actionTypes/postType';

const InitialState = {
  loadPlaceData: undefined,
  images: ''
};

const postReducer = (state = InitialState, action: I_postAction) => {
  switch (action.type) {
    case E_postActionType.NEW_POST_REQUEST:
      return { ...state };
    case E_postActionType.NEW_POST_SUCCESS:
      return { ...state };
    case E_postActionType.NEW_POST_ERROR:
      return { ...state };
    case E_postActionType.LOAD_PLACE_DATA:
      return { ...state, loadPlaceData: action.data };
    default:
      return { ...state };
  }
};

export default postReducer;
