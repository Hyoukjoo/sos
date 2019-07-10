import React from 'react';
import App, { Container, NextAppContext } from 'next/app';
import { Provider } from 'react-redux';
import withRedux, { AppProps } from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import Helmet from 'react-helmet';
import axios from 'axios';

import { makeStore } from '../store';
import Layout from '../components/Layout';
import { E_userActionType } from '../actionTypes/userType';
import { isBoolean } from 'util';

class MyApp extends App<AppProps> {
  static getInitialProps = async ({ Component, ctx }: NextAppContext) => {
    const { store, isServer } = ctx as any;

    const cookie = isServer ? ctx.req.headers.cookie : '';

    if (isServer && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    const {
      user: { myInfo }
    } = store.getState();

    if (!myInfo) {
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
