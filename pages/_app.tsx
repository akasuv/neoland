import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
