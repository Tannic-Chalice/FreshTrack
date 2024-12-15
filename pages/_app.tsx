// pages/_app.tsx
import "../styles/globals.css";  // Existing global styles
import "../styles/contact.css";  // Add the contact page CSS (global style)
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
