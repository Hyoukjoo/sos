import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  // static async getInitialProps(ctx: any) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return { ...initialProps };
  // }

  render() {
    return (
      <html>
        <Head>
          <script src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBSM_qaz6K_DqkoooxdtFie8pgUF9p9FK8&libraries=places' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
