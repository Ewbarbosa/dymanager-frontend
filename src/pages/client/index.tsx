import styles from './styles.module.scss'
import { toast } from 'react-toastify'
import { FormEvent, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import Head from 'next/head'
import { Header } from '../../components/ui/Header'
import { Input } from '../../components/ui/Input'

import { mask } from 'remask'

import { setupAPIClient } from '../../services/api'

export default function Client() {

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

  const maskBorn_in = e => {
    setBorn_in(mask(e.target.value, ['99/99/9999']))
  }

  async function handle(event: FormEvent) {
    event.preventDefault();

    if (name === '') {
      toast.warning(name);
      return;
    }

    const dateobj = new Date(born_in);

    const newDate = dateobj.toISOString();

    const api = setupAPIClient();

    await api.post('/client',
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

    toast.success('Salvo com sucesso!')
  }
  return (
    <>
      <Head>
        <title> Novo Cliente - DyManager</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <Tabs className={styles.tabs}>
            <h1>Novo Cliente</h1>
            <TabList className={styles.bloc}>
              <Tab className={styles.tab}>
                <button>
                  Dados Pessoais
                </button>
              </Tab>
              <Tab className={styles.tab}>
                <button>
                  Endereço
                </button>
              </Tab>
            </TabList>

            <TabPanel>
              <form className={styles.form} onSubmit={handle}>
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
                //onKeyUp={masBorn_in}
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
                  Cadastrar
                </button>
              </form>
            </TabPanel>
            <TabPanel>
              <h1>Cadastro de endereço</h1>
            </TabPanel>
          </Tabs>
        </main>
      </div>
    </>
  )
}