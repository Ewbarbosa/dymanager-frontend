import styles from './styles.module.scss'

import Head from 'next/head';

import { Header } from '../../components/ui/Header';

export default function Process() {
  return (
    <>
      <Head>
        <title>Painel - DyManager</title>
      </Head>
      <Header />
      <div className={styles.content}>
        <h2>Página em construção</h2>
      </div>
    </>
  )
}