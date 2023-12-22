import styles from './styles.module.scss'

import { useState } from 'react'

import Head from 'next/head'
import { Header } from '../../components/ui/Header'

import { Table } from '../../components/ui/Table'

import { setupAPIClient } from '../../services/api'

import Modal from 'react-modal'
import { ModalFormClient } from '../../components/ui/ModalFormClient'

import { MdOutlineAddCircle } from 'react-icons/md'

import { canSSRAuth } from '../../utils/canSSRAuth'

// tipagem para o objeto recebido do server side
type Client = {
  nome: string;
  cpf: string;
  telefone: string;
}

export default function Client({ clients }) {

  const [company, setCompany] = useState('');
  const [office, setOffice] = useState('');

  const [modalItem, setModalItem] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal() {
    setModalVisible(!modalVisible);
  }

  Modal.setAppElement('#__next');

  var array: Array<Client> = [];

  for (let i = 0; i < clients.length; i++) {
    let nome = clients[i].name;
    let cpf = clients[i].cnpjcpf;
    let telefone = clients[i].telephone;
    
    array.push({nome, cpf, telefone});
  }

  return (
    <>
      <Head>
        <title> Novo Cliente - DyManager</title>
      </Head>

      <Header />

      <div className={styles.container}>
        <MdOutlineAddCircle onClick={handleCloseModal} color='#fff' size={36} />
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