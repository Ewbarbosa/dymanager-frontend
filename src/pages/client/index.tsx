import styles from './styles.module.scss'

import { useState } from 'react'

import Head from 'next/head'
import { Header } from '../../components/ui/Header'
import { Table } from '../../components/ui/Table'
import { Form } from '../../components/ui/Form'

import { setupAPIClient } from '../../services/api'

import { canSSRAuth } from '../../utils/canSSRAuth'

// tipagem para o objeto recebido do server side
type ClientProps = {
  //id: number;
  name: string;
}

// interface 
// aqui o clients é uma array de obj do tipo ClientProps
interface HomeProps {
  clients: ClientProps[];
}

export default function Client({ clients }: HomeProps) {

  const [company, setCompany] = useState('');
  const [office, setOffice] = useState('');

  return (
    <>
      <Head>
        <title> Novo Cliente - DyManager</title>
      </Head>

      <div>
        <Header />

        <Table clients={clients} />

        <Form />

      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  const api = setupAPIClient(ctx);

  const response = await api.get('/clients');

  //console.log(response.data);

  return {
    props: {
      clients: response.data
    }
  }
})