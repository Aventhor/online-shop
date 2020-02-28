import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider, StylesProvider, jssPreset } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from '../components/header/header';
import AuthManager from '../src/modules/auth-manager';
import theme from '../src/theme';
import './scss/index.scss';
import { create } from 'jss';

let jssElement = null;
if (typeof window !== 'undefined') {
    jssElement = document.getElementById('jss-insertion-point');
}
const jss = create({
    ...jssPreset(),
    // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
    insertionPoint: jssElement
});

export default class MyApp extends App<{}, any> {

    state = {
        authUser: AuthManager.getAuthUser(),
    }

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }

    render() {
        const { Component, pageProps } = this.props;
        const { authUser } = this.state;

        return (
            <React.Fragment>
                <Head>
                    <title>Front End</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                </Head>
                <ThemeProvider theme={theme}>
                    <StylesProvider jss={jss}>
                        <CssBaseline />
                        <Header authUser={authUser} />
                        <Component {...pageProps} />
                    </StylesProvider >
                </ThemeProvider>
            </React.Fragment>
        );
    }
}