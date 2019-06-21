import React from 'react';
import App, { Container, NextAppContext } from 'next/app';
import { Provider, useSelector } from 'react-redux';
import withRedux, { AppProps } from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import axios from 'axios';

import { makeStore } from '../store';
import Layout from '../components/Layout';
import { E_userAction } from '../actionTypes/userType';

import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';
import rootSaga from '../sagas';
import reducer from '../reducers';

class MyApp extends App<AppProps> {
  static getInitialProps = async ({ Component, ctx }: NextAppContext) => {
    console.log('MyApp');

    const cookie = ctx.isServer ? ctx.req.headers.cookie : '';

    if (ctx.isServer && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    const {
      user: { myInfo }
    } = ctx.store.getState();

    console.log(myInfo);

    if (!myInfo) {
      ctx.store.dispatch({
        type: E_userAction.LOAD_USER_INFO_REQUEST
      });
    }

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

    return { pageProps };
  };

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(withReduxSaga(MyApp));
