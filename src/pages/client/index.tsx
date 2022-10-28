import styles from './styles.module.scss'
import { toast } from 'react-toastify'
import { FormEvent } from 'react'
import Head from 'next/head'
import { Header } from '../../components/ui/Header'
import { Input } from '../../components/ui/Input'

export default function Client() {

  async function handle(event: FormEvent){
    event.preventDefault();
    
    toast.info('Funcionalidade em desenvolvimento...')
  }
  return (
    <>
      <Head>
        <title> Novo Cliente - DyManager</title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <h1>
            Novo cliente
          </h1>

          <form className={styles.form}>
            <Input placeholder='Nome completo' />
            <Input placeholder='CPF' />
            <Input placeholder='Sexo' />
            <Input placeholder='Nacionalidade' />
            <Input placeholder='Data de Nascimento' />
            <Input placeholder='Contato Principal' />
            <Input placeholder='Secundário (Opcional)' />
            <Input placeholder='Email' />
            <Input placeholder='Empresa' />
            <Input placeholder='Cargo' />
            <Input placeholder='Status Ex: Ativo ou Inativo' />

            <button
              className={styles.buttonAdd}
              type='submit'
              onClick={handle}
            >
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  )

}