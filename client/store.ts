import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { END } from 'redux-saga';

import reducer from './reducers';
import rootSaga from './sagas';
import { E_userAction } from './actionTypes/userType';

export const makeStore = (initailState: any) => {
  const sagaMiddleware = createSagaMiddleware();
  const middleWares: any[] = [
    sagaMiddleware,
    store => next => action => {
      next(action);
    }
  ];
  const composeEnhancers = composeWithDevTools({});
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? composeEnhancers(applyMiddleware(...middleWares))
      : compose(applyMiddleware(...middleWares));
  const store = createStore(reducer, initailState, enhancer);

  console.log('store init');

  (store as any).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};
