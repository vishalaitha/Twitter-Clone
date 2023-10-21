import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Inter,Quicksand } from 'next/font/google';
const quickSand = Quicksand({subsets:["latin"]})
const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return <div className={inter.className}><Component {...pageProps} /></div>
}
