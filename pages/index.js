import Head from 'next/head'
import Header from '../components/Header.js'
import ChallengesWrapper from '../components/ChallengesWrapper.js'
import Footer from '../components/Footer.js'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Challenger</title>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="Challenger helps you track and achieve your goals"
        />
        <meta name="keywords" content="Keywords" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>

      <main>
        <Header />
        <ChallengesWrapper />
      </main>

      <Footer />
    </div>
  )
}
