import styles from './styles.module.scss'

import { useState } from 'react'

import Link from 'next/link'

import Head from 'next/head'
import { Header } from '../../components/ui/Header'

import { Table } from '../../components/ui/Table'

import { setupAPIClient } from '../../services/api'

import Modal from 'react-modal'
import { ModalFormClient } from '../../components/ui/ModalFormClient'

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

export default function Client({ clients }) {

  const [modalVisible, setModalVisible] = useState(false);

  const [listClient, setListClient] = useState<ClientProps[]>([]);

  function handleCloseModal() {
    setModalVisible(!modalVisible);
  }

  Modal.setAppElement('#__next');

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
  }, [])

  return (
    <>
      <Head>
        <title> Novo Cliente - DyManager</title>
      </Head>

      <Header />

      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Novo Cliente</h1>
          {/*<MdOutlineAddCircle onClick={handleCloseModal} color='#fff' size={36} />*/}
          <Link href="/newclient">
            <MdOutlineAddCircle color='#fff' size={36} />
          </Link>
        </div>
        <Table data={array} />
      </div>

      {modalVisible && (
        <ModalFormClient
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
        />
      )}
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