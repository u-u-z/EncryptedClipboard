import '../styles/index.css'
import '@hackplan/uui/lib/index.css';
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }) {
  return <RecoilRoot><Component {...pageProps} /></RecoilRoot>
}

export default MyApp
