import "@/styles/globals.css";

import { IBM_Plex_Sans } from "next/font/google";

const ibm_plex_sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function App({ Component, pageProps }) {
  return (
    <main className={ibm_plex_sans.className}>
      <Component {...pageProps} />
    </main>
  );
}
