import styles from './styles.module.scss'

import { Input } from '../Input'
import { Button } from '../Button'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { FormEvent, useState, useContext } from 'react'

import { ClientContext } from '../../../contexts/ClientContext'

import { api } from '../../../services/apiClient'
import { toast } from 'react-toastify'

import AsyncSelect from 'react-select/async'

import Select from 'react-select'

import { canSSRAuth } from '../../../utils/canSSRAuth';
import { setupAPIClient } from '../../../services/api'

export function FormProcess() {

  const { searchClient } = useContext(ClientContext);

  const [id, setId] = useState('');
  const [forum, setForum] = useState('');
  const [number, setNumber] = useState('');
  const [courtDivision, setCourtDivision] = useState('');
  const [action, setAction] = useState('');
  const [distributedAt, setDistributedAd] = useState('');
  const [causeValue, setCauseValue] = useState('');
  const [status, setStatus] = useState('');
  const [observation, setObservation] = useState('');
  const [clientId, setClientId] = useState('');

  const [cnpjcpf, setCnpjcpf] = useState('');

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
      client_id: parseInt(clientId)
    })

    toast.success('Salvo com sucesso!')

    setId('');
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
                placeholder='ID'
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
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
                isMulti
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

  console.log(res.data);

  //console.log(response.data);

  return {
    props: {
      process: response.data
    }
  }
})