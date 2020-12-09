import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Router from "next/router";
import storage from "redux-persist/lib/storage";
import * as Sentry from "@sentry/node";
import { RewriteFrames } from "@sentry/integrations";
import getConfig from "next/config";
import reducers from "../common/data/reducers";
import { useStore } from "../store";
import App from "../src/App";
import "react-google-places-autocomplete/dist/index.min.css";
import "../styles/global.css";
import * as gtag from "../src/helpers/gtag";
import "bootstrap/dist/css/bootstrap.min.css"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["main"],
  // whitelist: ['auth'], // place to select which state you want to persist
};
const persistedReducer = persistReducer(persistConfig, reducers);
if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  const config = getConfig();
  const distDir = `${config.serverRuntimeConfig.rootDir}/.next`;
  Sentry.init({
    enabled: process.env.NODE_ENV === "production",
    integrations: [
      new RewriteFrames({
        iteratee: (frame) => {
          // eslint-disable-next-line no-param-reassign
          frame.filename = frame.filename.replace(distDir, "app:///_next");
          return frame;
        },
      }),
    ],
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.ENV,
  });
}

function MyApp(props) {
  const {
    pageProps: { initialReduxState },
  } = props;
  const store = useStore(initialReduxState, persistedReducer);
  const persistor = persistStore(store);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    const handleRouteChange = (url) => {
      setTimeout(() => {
        window.analytics.page(url);
        gtag.pageview(url);
      }, 200); // Wait for react <Head> to update title before tracking
    };
    Router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<App {...props} />} persistor={persistor}>
        <App {...props} />
      </PersistGate>
    </Provider>
  );
}

MyApp.propTypes = {
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
