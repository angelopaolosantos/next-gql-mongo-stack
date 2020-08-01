import '../styles/globals.less'
import ApolloProvider from '../context/apollo'

function MyApp({ Component, pageProps }) {
  return (
  <ApolloProvider>
    <Component {...pageProps} />
  </ApolloProvider>
  )
}

export default MyApp
