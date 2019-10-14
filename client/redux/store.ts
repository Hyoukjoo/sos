import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from './rootReducer';
import rootSaga from './rootSaga';

const makeStore = (initailState: any) => {
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

  (store as any).sagaTask = sagaMiddleware.run(rootSaga);

  return store;
};

export default makeStore;
