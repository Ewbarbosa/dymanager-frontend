import styles from './styles.module.scss'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import { Header } from '../../components/ui/Header';

import Link from 'next/link';

import Head from 'next/head';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { FormEvent, useState, useContext } from 'react'

import { ClientContext } from '../../contexts/ClientContext'

import { api } from '../../services/apiClient'
import apiCEP from '../../services/apiCEP'

import { toast } from 'react-toastify'
import { mask } from 'remask'

import { FiSearch } from 'react-icons/fi'

export default function NewClient() {

  const [tabIndex, setTabIndex] = useState(0);

  const [name, setName] = useState('');
  const [cnpjcpf, setCnpjcpf] = useState('');
  const [sex, setSex] = useState('');
  const [nationality, setNationality] = useState('');
  const [born_in, setBorn_in] = useState('');
  const [telephone, setTelephone] = useState('');
  const [telephone2, setTelephone2] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const [street, setStreet] = useState('');
  const [zip_code, setZip_code] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const [loading, setLoading] = useState(false);

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

  async function handleCep() {
    if (zip_code === '') {
      return
    }

    try {
      const response = await apiCEP.get(`${zip_code}/json`);
      console.log(response.data);

      setZip_code(response.data.cep);
      setStreet(response.data.logradouro);
      setDistrict(response.data.bairro);
      setCity(response.data.localidade);
      setState(response.data.uf);

    } catch {
      toast.warning('Erro ao buscar o CEP!');
    }
  }

  async function handle(event: FormEvent) {
    event.preventDefault();
    //if (street === '' || zip_code === '' || district === '' || city === '' || state === '') {
    //  toast.warning('Preencha os campos.');
    //  return;
    //}

    setLoading(true);

    try {
      addClient();      

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
      setStatus('');

      setStreet('');
      setZip_code('');
      setDistrict('');
      setCity('');
      setState('');

      setTabIndex(0);
      setLoading(false);

      toast.success('Salvo com sucesso!');

    } catch (err) {
      toast.warning('Erro ao salvar os dados: ' + err.message);
    }
  }

  async function addClient() {

    const dateobj = new Date(born_in);

    const newDate = dateobj.toISOString();

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

    //if (name === '' || cnpjcpf === '' || telephone === '' || email === '') {
    //  toast.warning('Preencha os campos.');
    //  return;
    //}

    changeTab();
  }

  // funcao timeout, timer
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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

          {/* aqui inicia aba de ENDEREÇO */}
          <TabPanel>
            <h1>Endereço</h1>
            <form className={styles.form} onSubmit={handle}>
              <Input placeholder='Rua/Avenida, 123'
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />

              {/* button de busca CEP */}
              <div className={styles.btCep}>
                <Input placeholder='CEP'
                  value={zip_code}
                  onChange={(e) => setZip_code(e.target.value)}
                />
                <button onClick={handleCep}>
                  <FiSearch size={20} color="#fff" />
                </button>
              </div>

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
    </>
  )
}
