import styles from './styles.module.scss'

import Head from 'next/head';

import { Header } from '../../components/ui/Header';
import { Table } from '../../components/ui/Table'
import { ModalFormProcess } from '../../components/ui/ModalFormProcess';

import { MdOutlineAddCircle } from 'react-icons/md'
import { canSSRAuth } from '../../utils/canSSRAuth';

import { setupAPIClient } from '../../services/api';

type Process = {
  id: number;
  forum: string;
  number: number;
}

export default function Process({ process }) {

  var array: Array<Process> = [];

  for (let i = 0; i < process.length; i++) {
    let id = process[i].id;
    let forum = process[i].forum;
    let number = process[i].number;

    array.push({id, forum, number});
  }

  return (
    <>
      <Head>
        <title>Painel - DyManager</title>
      </Head>

      <Header />

      <div className={styles.container}>
        <MdOutlineAddCircle color='#fff' size={36} />
        <Table data={array} />
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  const api = setupAPIClient(ctx);

  const response = await api.get('/processes');

  //console.log(response.data);

  return {
    props: {
      process: response.data
    }
  }
})