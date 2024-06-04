import styles from './styles.module.scss'

import Head from 'next/head';

import { Header } from '../../components/ui/Header';
import { Table } from '../../components/ui/Table'
import { ModalFormProcess } from '../../components/ui/ModalFormProcess';

import Link from 'next/link';

import { MdOutlineAddCircle } from 'react-icons/md'
import { canSSRAuth } from '../../utils/canSSRAuth';

import { setupAPIClient } from '../../services/api';
import { useState } from 'react';

import Modal from 'react-modal'

// tipagem para o objeto recebido do server side
type ProcessProps = {
  id: number;
  forum: string;
  number: number;
}

export default function Process({ process }) {

  Modal.setAppElement('#__next');

  const [modalVisible, setModalVisible] = useState(false);

  function handleCloseModal() {
    setModalVisible(!modalVisible);
  }

  var array: Array<ProcessProps> = [];

  for (let i = 0; i < process.length; i++) {
    let id = process[i].id;
    let forum = process[i].forum;
    let number = process[i].number;

    array.push({ id, forum, number });
  }

  return (
    <>
      <Head>
        <title>Painel - DyManager</title>
      </Head>

      <Header />

      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Novo Processo</h1>
          <Link href="newprocess">
            <MdOutlineAddCircle color='#fff' size={36} />
          </Link>
        </div>
        <Table data={array} />
      </div>

      {modalVisible && (
        <ModalFormProcess
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
        />
      )}
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  const api = setupAPIClient(ctx);

  const response = await api.get('/processes');

  const res = await api.get('/persons');

  //console.log(res.data);

  //console.log(response.data);

  return {
    props: {
      process: response.data
    }
  }
})