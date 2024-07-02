'use client'

import styles from './styles.module.scss'

import { useState } from 'react'

import Link from 'next/link'

import Head from 'next/head'
import { Header } from '../../components/ui/Header'

import { Table } from '../../components/ui/Table'

import { setupAPIClient } from '../../services/api'

import { MdOutlineAddCircle } from 'react-icons/md'

import { canSSRAuth } from '../../utils/canSSRAuth'

import { useEffect } from 'react'

// tipagem para o objeto recebido do server side
export type ClientProps = {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
}

export default function Clients({ clients }) {

  const [listClient, setListClient] = useState<ClientProps[]>([]);  

  var array: Array<ClientProps> = [];

  for (let i = 0; i < clients.length; i++) {
    let id = clients[i].id;
    let nome = clients[i].name;
    let cpf = clients[i].cnpjcpf;
    let telefone = clients[i].telephone;

    array.push({ id, nome, cpf, telefone });
  }

  useEffect(() => {
    setListClient(clients);
  }, [clients])

  return (
    <>
      <Head>
        <title> Novo Cliente - DyManager</title>
      </Head>

      <Header />

      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Novo Cliente</h1>

          <Link href="/newclient">            
              <MdOutlineAddCircle color='#fff' size={36} />            
          </Link>

        </div>
        <Table data={array} />
      </div>

    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  const api = setupAPIClient(ctx);

  const response = await api.get('/persons');

  return {
    props: {
      clients: response.data
    }
  }
})