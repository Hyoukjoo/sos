import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { config } from 'dotenv';

config();

export default class MyDocument extends Document {
  // static async getInitialProps(ctx: any) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return { ...initialProps };
  // }

  render() {
    return (
      <html>
        <Head>
          <title>sealrock</title>
          <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
