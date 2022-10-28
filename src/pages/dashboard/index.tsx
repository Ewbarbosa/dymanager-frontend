import styles from './styles.module.scss'
import Head from 'next/head';

import { Header } from '../../components/ui/Header';

// import para validar a rota privada
import { canSSRAuth } from '../../utils/canSSRAuth'

export default function Dashboard() {

  return (
    <>
    <Head>
      <title>Painel - DyManager</title>
    </Head>
    <Header/>      
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: { }
  }
})