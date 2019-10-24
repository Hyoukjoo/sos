import React from 'react';
import { NextComponentType } from 'next';
import App from 'next/app';
import { Provider } from 'react-redux';
import withRedux, { NextJSContext } from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import { Store } from 'redux';
import axios from 'axios';

import makeStore from '../redux/store';

import Layout from '../components/Layout';

import { E_userType } from 'redux/user/userType';

interface I_props {
  store: Store;
}

class MyApp extends App<I_props> {
  // public static async getInitialProps({ Component, ctx }: AppContextType<Router>) {
  //   const { store, isServer } = ctx as any;

  //   const cookie = isServer ? ctx.req.headers.cookie : '';

  //   if (isServer && cookie) {
  //     axios.defaults.headers.Cookie = cookie;
  //   }

  //   const state = store.getState();

  //   const { userId } = state.user.myInfo;

  //   if (!userId) {
  //     store.dispatch({
  //       type: E_userType.LOAD_USER_INFO_REQUEST
  //     });
  //   }

  //   const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

  //   return { pageProps };
  // }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}

export default withRedux(makeStore)(withReduxSaga(MyApp));
