import React from 'react';
import App, { Container, NextAppContext } from 'next/app';
import { Provider } from 'react-redux';
import withRedux, { AppProps } from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import axios from 'axios';
import Helmet from 'react-helmet';
import { config } from 'dotenv';

import Layout from '../components/Layout';
import { makeStore } from '../store';
import { E_userActionType } from '../actionTypes/userType';

class MyApp extends App<AppProps> {
  static getInitialProps = async ({ Component, ctx }: NextAppContext) => {
    const { store, isServer } = ctx as any;

    const cookie = isServer ? ctx.req.headers.cookie : '';

    if (isServer && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    const state = store.getState();

    if (!state.user.myInfo.userId) {
      store.dispatch({
        type: E_userActionType.LOAD_USER_INFO_REQUEST
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
