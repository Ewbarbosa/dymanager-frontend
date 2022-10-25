import { AppProps } from 'next/app'
import '../../styles/globals.scss'

/* importando o contexto para toda a aplicação
*/
import { AuthProvider } from '../contexts/AuthContext'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
