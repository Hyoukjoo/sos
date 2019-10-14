import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux, { AppProps, NextJSAppContext } from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import axios from 'axios';

import makeStore from '../redux/store';

import { E_userType } from '../redux/user/userType';
import { E_profileType } from '../redux/profile/profileType';
import { E_followType } from '../redux/follow/followType';

import Layout from '../components/Layout';

class MyApp extends App<AppProps> {
  static getInitialProps = async ({ Component, ctx }: NextJSAppContext) => {
    const { store, isServer } = ctx;

    const cookie = isServer ? ctx.req.headers.cookie : '';

    if (isServer && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }

    const state = store.getState();

    const { userId } = state.user.myInfo;

    if (!userId) {
      store.dispatch({
        type: E_userType.LOAD_USER_INFO_REQUEST
      });
    }

    store.dispatch({
      type: E_profileType.LOAD_MY_PROFILE_INFO_REQUEST
    });

    store.dispatch({
      type: E_followType.LOAD_MY_FOLLOW_INFO_REQUEST
    });

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
