import "../styles/global.scss";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import PopulatedNavBar from "../components/PopulateNavBar";
import React from 'react';

if (typeof window !== "undefined") {
    console.error = (message) => {
      if (message.includes('Support for defaultProps will be removed')) {
        return;
      }
      console.warn(message);
    };
  }

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <SessionProvider session={session}>
            <PopulatedNavBar />
            <Component {...pageProps} />
        </SessionProvider>);
}
export default MyApp;