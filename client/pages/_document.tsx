import React from 'react';
import Document, { Head, Main, NextScript, NextDocumentContext } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: NextDocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <title>sealrock</title>
          <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}&libraries=places`} />
          <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
