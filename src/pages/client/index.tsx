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

  const [modalItem, setModalItem] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal() {
    setModalVisible(!modalVisible);
  }

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title> Novo Cliente - DyManager</title>
      </Head>

      <Header />

      <div
        className={styles.container}>
        <MdOutlineAddCircle onClick={handleCloseModal} color='#fff' size={36} />
      </div>

      <Table clients={clients} />

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