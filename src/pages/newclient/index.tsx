import styles from './styles.module.scss'

import { Header } from '../../components/ui/Header';
import { FormPerson } from '../../components/ui/FormPerson';
import { FormAddress } from '../../components/ui/FormAddress';

import Head from 'next/head';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { FormEvent, useState, useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext';

import { api } from '../../services/apiClient'

import { toast } from 'react-toastify'

import { PersonData } from '../../components/ui/FormPerson';
import { AddressData } from '../../components/ui/FormAddress';

export default function NewClient() {

  const [tabIndex, setTabIndex] = useState(0);

  const { user } = useContext(AuthContext);

  const changeTab = () => {
    if (tabIndex === 0) {
      setTabIndex(1)
    }
    else {
      setTabIndex(0)
    }
  }

  async function handleFormPersonSubmit(data: PersonData, resetForm: () => void) {
    try {
      const dateobj = new Date(data.born_in);

      const newDate = dateobj.toISOString();

      const response = await api.post('/person', {
        name: data.name,
        rg: data.rg,
        cnpjcpf: data.cnpjcpf,
        sex: data.sex,
        nationality: data.nationality,
        born_in: newDate,
        maritial_status: data.maritial_status,
        telephone: data.telephone,
        telephone2: data.telephone2,
        email: data.email,
        type: data.type,
        status: data.status,
        user_id: user.id
      });

      if (response.status === 200) {
        toast.success('Salvo com sucesso!');
        resetForm();
        changeTab();
      }

    } catch (err) {      
      toast.warning('Erro: ' + err.response.data.error);      
    }
  }

  async function handleFormAddressSubmit(data: AddressData) {
    try {
      const response = await api.post('/person/address', {
        street: data.street,
        complement: data.complement,
        zip_code: data.zip_code,
        district: data.district,
        city: data.city,
        state: data.state,
        user_id: user.id
      });

      if (response.status === 200) {
        toast.success('Salvo com sucesso!');
      }

    } catch (error) {
      console.error('Erro ao salvar o endereço: ', error)
    }
  }
  
  return (
    <>
      <Head>
        <title>Novo Processo - DyManager</title>
      </Head>
      <Header />

      <main className={styles.container}>
        <Tabs className={styles.tabs} selectedIndex={tabIndex}
          onSelect={(index) => { setTabIndex(index) }}>

          <TabList className={styles.bloc}>
            <Tab className={styles.tab}>
              <button>
                Dados Pessoais
              </button>
            </Tab>
            <hr></hr>
            <Tab className={styles.tab}>
              <button disabled={true}>
                Endereço
              </button>
            </Tab>
          </TabList>

          <TabPanel>
            <FormPerson onSubmit={(data, resetForm) => handleFormPersonSubmit(data, resetForm)} />

          </TabPanel>

          {/* aqui inicia aba de ENDEREÇO */}
          <TabPanel>

            <FormAddress onSubmit={handleFormAddressSubmit} />
            <button
              className={styles.button}
              onClick={changeTab}
              type='button'
            >
              Voltar
            </button>

          </TabPanel>
        </Tabs>

      </main>
    </>
  )
}
