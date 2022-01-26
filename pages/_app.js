import '../styles/globals.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return <div className="frank">
    <Head>
      <title>一个网站</title>
      <meta name="description" content="Generated by create next app" />
      {/* <link rel="icon" href="/favicon.ico" /> */}
    </Head>
    <Component {...pageProps} />
  </div>
}

export default MyApp
