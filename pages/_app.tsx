import "../styles/globals.css"
import apolloClient from "../lib/apollo"
import Header from "../components/Header"
import { ApolloProvider } from "@apollo/client"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ApolloProvider client={apolloClient}>
        <Header/>
        <Component {...pageProps} />
      </ApolloProvider>
    </>
  )
}

export default MyApp
