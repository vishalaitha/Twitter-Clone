import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter,Quicksand } from 'next/font/google';
import {GoogleOAuthProvider} from '@react-oauth/google'
const quickSand = Quicksand({subsets:["latin"]})
const inter = Inter({ subsets: ["latin"] });
import toast, { Toaster } from 'react-hot-toast';


export default function App({ Component, pageProps }: AppProps) {
  return (<div className={inter.className}>
    <GoogleOAuthProvider clientId='518812273278-fbvpk5ok80dhdosv7qpfg376nbbagpa8.apps.googleusercontent.com'>
      <Component {...pageProps} />
      <Toaster/>
    </GoogleOAuthProvider>
    </div>)
}
