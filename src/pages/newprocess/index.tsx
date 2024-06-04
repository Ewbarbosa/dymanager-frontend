import styles from './styles.module.scss'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Header } from '../../components/ui/Header';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { FormEvent, useState, useContext } from 'react'

import { ClientContext } from '../../contexts/ClientContext'

import { api } from '../../services/apiClient'
import { toast } from 'react-toastify'

import Select, { MultiValue } from 'react-select'

import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupAPIClient } from '../../services/api'

import Head from 'next/head';

interface OptionProps {
  value: number;
  label: string;
}

type SelectOption = {
  label: string;
  value: number;
}

type MultipleSelect = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
}

export default function NewProcess({ clients }) {

  var array: Array<OptionProps> = [];

  for (let i = 0; i < clients.length; i++) {
    let value = clients[i].id;
    let label = clients[i].cnpjcpf;

    array.push({ value, label });
  }

  const [optionSelected, setOptionSelected] = useState<MultiValue<SelectOption>>([array[0]])

  const { searchClient } = useContext(ClientContext);

  const [forum, setForum] = useState('');
  const [number, setNumber] = useState('');
  const [courtDivision, setCourtDivision] = useState('');
  const [action, setAction] = useState('');
  const [distributedAt, setDistributedAd] = useState('');
  const [causeValue, setCauseValue] = useState('');
  const [status, setStatus] = useState('');
  const [observation, setObservation] = useState('');
  const [clientId, setClientId] = useState('');

  const [loading, setLoading] = useState(false);

  async function addProcess(event: FormEvent) {
    event.preventDefault();

    setLoading(true);

    const dateObj = new Date(distributedAt);

    const newDate = dateObj.toISOString();

    const response = await api.post('/process', {
      forum: forum,
      number: number,
      court_division: courtDivision,
      action: action,
      distributed_at: newDate,
      cause_value: parseFloat(causeValue),
      status: status,
      observation: observation,
      user_id: 2
    })

    for (let i = 0; i < optionSelected.length; i++) {
      const res = await api.post('/personprocess', {
        client_id: optionSelected[i].value,
        process_id: response.data.id
      })

      console.log(optionSelected)
      console.log(response.data.id)
      console.log(res.data)
    }

    toast.success('Salvo com sucesso!')

    setForum('');
    setNumber('');
    setCourtDivision('');
    setAction('');
    setDistributedAd('');
    setCauseValue('');
    setStatus('');
    setObservation('');
    setClientId('');

    setLoading(false);
  }

  async function search(cnpjcpf: string) {

    await searchClient(cnpjcpf);
  }

  return (
    <>
      <Head>
        <title>Novo Processo - DyManager</title>
      </Head>
      <Header />
      <main className={styles.container}>
        <Tabs className={styles.tabs}>
          <TabList className={styles.bloc}>
            <Tab className={styles.tab}>
              <button>
                Dados do Processo
              </button>
            </Tab>
          </TabList>

          <TabPanel>
            <h1>Dados do Processo</h1>
            <form className={styles.form} onSubmit={addProcess}>

              <Input
                placeholder='Fórum'
                value={forum}
                onChange={(e) => setForum(e.target.value)}
              />
              <Input
                placeholder='Número'
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <Input
                placeholder='Divisão Judicial'
                value={courtDivision}
                onChange={(e) => setCourtDivision(e.target.value)}
              />
              <Input
                placeholder='Ação'
                value={action}
                onChange={(e) => setAction(e.target.value)}
              />
              <Input
                type='date'
                placeholder='Data de distribuição'
                value={distributedAt}
                onChange={(e) => setDistributedAd(e.target.value)}
              />
              <Input
                placeholder='Valor da Causa'
                value={causeValue}
                onChange={(e) => setCauseValue(e.target.value)}
              />
              <Input
                placeholder='Status'
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
              <Input
                placeholder='Observação'
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              />

              <Select
                className='select'
                isMulti
                options={array}
                placeholder='Selecione ao menos uma opção'
                closeMenuOnSelect={false}
                onChange={value => setOptionSelected(value)}
                styles={{
                  control: (styles) => {
                    return {
                      ...styles,
                      backgroundColor: '#202024',
                      color: '#fff',
                      border: 'solid 1px #fff',
                      borderRadius: '8px'
                    }
                  },
                  option: (styles) => {
                    return {
                      ...styles,
                      backgroundColor: '#202024',
                      color: '#fff',
                    }
                  },
                  placeholder: (styles) => {
                    return {
                      ...styles,
                      color: '#3e4956'
                    }

                  }
                }}
              />

              <br />

              <Button
                className={styles.buttonAdd}
                type="submit"
                loading={loading}
              >
                Salvar
              </Button>
            </form>
            <Button onClick={() => console.log(optionSelected)}>Exibir</Button>
          </TabPanel>
        </Tabs>
      </main>
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
      clients: res.data
    }
  }
})