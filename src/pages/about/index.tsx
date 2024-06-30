import styles from './page.module.scss'

import Head from 'next/head';

import { Header } from '../../components/ui/Header'

export default function About() {
  return (
    <>
      <Head>
        <title> Sobre - DyManager</title>
      </Head>

      <Header />
      <div className={styles.content}>
        <h2>Página em construção</h2>
      </div>

    </>
  )
}