import styles from './styles.module.scss'
import { toast } from 'react-toastify'
import { FormEvent, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import Head from 'next/head'
import { Header } from '../../components/ui/Header'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import { mask } from 'remask'

import { setupAPIClient } from '../../services/api'

export default function Client() {

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState('');
  const [cnpjcpf, setCnpjcpf] = useState('');
  const [sex, setSex] = useState('');
  const [nationality, setNationality] = useState('');
  const [born_in, setBorn_in] = useState('');
  const [telephone, setTelephone] = useState('');
  const [telephone2, setTelephone2] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [office, setOffice] = useState('');
  const [status, setStatus] = useState('');

  const [street, setStreet] = useState('');
  const [zip_code, setZip_code] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [client_id, setClient_id] = useState('');

  const [tabIndex, setTabIndex] = useState(0);

  const maskEdit = e => {
    //console.log(mask('0000', ['99.99']))
    setCnpjcpf(mask(e.target.value, ['999.999.999-99']));
  };

  const maskTel = e => {
    setTelephone(mask(e.target.value, ['(99)99999-9999']))
  }

  const maskTel2 = e => {
    setTelephone2(mask(e.target.value, ['(99)99999-9999']))
  }

  const changeTab = () => {
    if (tabIndex === 0) {
      setTabIndex(1)
    }
    else {
      setTabIndex(0)
    }
  }

  // funcao timeout, timer
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async function handle(event: FormEvent) {
    event.preventDefault();
    if (street === '' || zip_code === '' || district === '' || city === '' || state === '') {
      toast.warning('Preencha os campos.');
      return;
    }

    setLoading(true);

    try {
      addClient();

      toast.success('Salvo com sucesso!');

      await sleep(3000);
      // após salvar limpa os campos
      setName('');
      setCnpjcpf('');
      setSex('');
      setNationality('');
      setBorn_in('');
      setTelephone('');
      setTelephone2('');
      setEmail('');
      setCompany('');
      setOffice('');
      setStatus('');

      setStreet('');
      setZip_code('');
      setDistrict('');
      setCity('');
      setState('');
      setTabIndex(0);
      setLoading(false);

    } catch (err) {
      toast.warning('Erro ao salvar os dados: ' + err.message);
    }
  }

  async function addClient() {

    const dateobj = new Date(born_in);

    const newDate = dateobj.toISOString();

    const api = setupAPIClient();

    const response = await api.post('/client',
      {
        name: name,
        cnpjcpf: cnpjcpf,
        sex: sex,
        nationality: nationality,
        born_in: newDate,
        telephone: telephone,
        telephone2: telephone2,
        email: email,
        company: company,
        office: office,
        status: status
      })

    const { id } = response.data;

    await api.post('/client/address',
      {
        street: street,
        zip_code: zip_code,
        district: district,
        city: city,
        state: state,
        client_id: id
      })
  }

  function nextTab(event: FormEvent) {
    event.preventDefault();

    if (name === '' || cnpjcpf === '' || telephone === '' || email === '') {
      toast.warning('Preencha os campos.');
      return;
    }

    changeTab();
  }

  return (
    <>
      <Head>
        <title> Novo Cliente - DyManager</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <Tabs className={styles.tabs} selectedIndex={tabIndex}
            onSelect={(index) => { setTabIndex(index) }}>

            <TabList className={styles.bloc}>
              <Tab className={styles.tab}>
                <button>
                  1
                </button>
              </Tab>
              <hr></hr>
              <Tab className={styles.tab}>
                <button>
                  2
                </button>
              </Tab>
            </TabList>

            <TabPanel>
              <h1>Dados Pessoais</h1>
              <form className={styles.form} onSubmit={nextTab}>
                <Input placeholder='Nome completo'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input placeholder='CPF'
                  onChange={(e) => setCnpjcpf(e.target.value)}
                  value={cnpjcpf}
                  onKeyUp={maskEdit}
                />
                <Input placeholder='Sexo'
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                />
                <Input placeholder='Nacionalidade'
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                />
                <Input placeholder='Data de Nascimento'
                  value={born_in}
                  onChange={(e) => setBorn_in(e.target.value)}
                  type="date"
                />
                <Input placeholder='Contato Principal'
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  onKeyUp={maskTel}
                />
                <Input placeholder='Secundário (Opcional)'
                  value={telephone2}
                  onChange={(e) => setTelephone2(e.target.value)}
                  onKeyUp={maskTel2}
                />
                <Input placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input placeholder='Empresa'
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
                <Input placeholder='Cargo'
                  value={office}
                  onChange={(e) => setOffice(e.target.value)}
                />
                <Input placeholder='Status Ex: Ativo ou Inativo'
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <button
                  className={styles.buttonAdd}
                  type='submit'
                >
                  Avançar
                </button>
              </form>
            </TabPanel>

            <TabPanel>
              <h1>Endereço</h1>
              <form className={styles.form} onSubmit={handle}>
                <Input placeholder='Rua/Avenida'
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                <Input placeholder='CEP'
                  value={zip_code}
                  onChange={(e) => setZip_code(e.target.value)}
                />
                <Input placeholder='Bairro'
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                />
                <Input placeholder='Cidade'
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <Input placeholder='Estado'
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />

                <button
                  className={styles.buttonAdd}
                  onClick={changeTab}
                >
                  Voltar
                </button>

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
      </div>
    </>
  )
}