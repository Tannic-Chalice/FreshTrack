// pages/_app.tsx
import "../styles/globals.css";  // Existing global styles
import "../styles/about_us.module.css";  // Add about_us page CSS (if needed)
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
