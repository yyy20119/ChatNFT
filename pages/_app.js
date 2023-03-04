import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"
import Head from "next/head"
import { NotificationProvider } from "web3uikit"
import Context from "../context/context"

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>ChatNFT</title>
                <meta name="description" content="ChatNFT" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <NotificationProvider>
                    <Header />
                    <Context>
                        <Component {...pageProps} />
                    </Context>
                </NotificationProvider>
            </MoralisProvider>
        </div>
    )
}

export default MyApp
