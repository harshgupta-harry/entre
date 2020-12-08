import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Head from "next/head";
import { SnackbarProvider } from "notistack";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import theme from "./theme";
import getOs from "./helpers/getOs";
import api from "../common/api";
import newApi from "../common/api/newApi";
import {
  checkSession,
  dismissAppModal,
  showAppModal,
} from "../common/data/actions";
import GoToMobile from "./components/GoToMobile";

import OneToOneCall from "./components/connect/one-to-one-call/OneToOneCall";

const App = (props) => {
  const { Component, pageProps } = props;
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.auth.token);
  const appModal = useSelector((state) => state.main.appModal);
  const dismissed = useSelector((state) => state.main.dismissed);

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(checkSession());
      if (getOs() === "Android" || getOs() === "iOS") {
        if (!dismissed && window.location.pathname !== "/summit") {
          dispatch(showAppModal());
        } else {
          dispatch(dismissAppModal());
        }
      }
    }
  }, [dismissed]);

  useEffect(() => {
    api.setToken(authToken);
    newApi.setToken(authToken);
  }, [authToken]);

  api.setToken(authToken);
  newApi.setToken(authToken);

  return (
    <SnackbarProvider maxSnack={3}>
      <Head>
        <title>Entre</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        <link
          rel="stylesheet"
          href="assets/plugin/bootstrap/bootstrap.min.css"
        />
        <link rel="stylesheet" href="assets/css/main.css"></link>
        <script
          type="text/javascript"
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_KEY}&libraries=places`}
        />
        <script type="text/javascript" src="assets/js/jquery.min.js"></script>
        <script type="text/javascript" src="assets/js/popper.min.js"></script>
        <script
          type="text/javascript"
          src="assets/plugin/bootstrap/bootstrap.min.js"
        ></script>
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <OneToOneCall />
        {/* <Component {...pageProps} /> */}
        {appModal ? (
          <GoToMobile
            onClose={() => dispatch(dismissAppModal())}
            os={getOs()}
          />
        ) : null}
      </ThemeProvider>
    </SnackbarProvider>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App;
