/* eslint-disable react/no-danger */
import React from 'react';
import * as snippet from '@segment/snippet';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../src/theme';
import TikTokPixel from '../src/pixels/tiktok';
import FaceBookPixel from '../src/pixels/fb';
import { GA_TRACKING_ID } from '../src/helpers/gtag';

export default class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  renderSnippet() {
    const opts = {
      apiKey: process.env.SEGMENT_KEY,
      page: true,
    };

    if (process.env.ENV === 'development') {
      return snippet.max(opts);
    }

    return snippet.min(opts);
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <FaceBookPixel />
          <TikTokPixel />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <script dangerouslySetInnerHTML={{ __html: this.renderSnippet() }} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Entre | Community for Entrepreneurs" />
          <meta property="og:description" content="Global Community for Entrepreneurs, Startups, Investors, and Innovators of all types" />
          <meta property="og:url" content="https://joinentre.com/" />
          <meta property="og:site_name" content="Entre | Community for Entrepreneurs" />
          <meta property="og:image" content="https://joinentre.com/logo.png" />
          <meta property="og:image:alt" content="Entre logo" />
          <meta property="og:locale" content="en_US" />
          <meta name="twitter:text:title" content="Entre | Community for Entrepreneurs" />
          <meta name="twitter:image" content="https://joinentre.com/logo.png" />
          <meta name="twitter:image:alt" content="Entre logo" />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
  });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
