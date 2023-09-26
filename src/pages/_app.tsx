import { AppProps } from 'next/app'
import '../../styles/globals.scss'

// import para personalizar os alertas
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

/* importando o contexto para toda a aplicação
*/
import { AuthProvider } from '../contexts/AuthContext'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      
      {/* aqui é a confg do alerta */}
      <ToastContainer autoClose={2000} />
    </AuthProvider>  
  )
}

export default MyApp
