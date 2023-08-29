import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/home.module.scss'

// logo do sistema
//import logo from '../../public/logo.png'

// componentes
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

/* contexto */
import { AuthContext } from '../contexts/AuthContext'
import { useContext, FormEvent, useState} from 'react'

// import para usar links
import Link from 'next/link'

import { canSSRGuest } from '../utils/canSSRGuest'

import { toast } from 'react-toastify'

export default function Home() {

  // aqui é chamada a funçao sigIn do context
  const { signIn } = useContext(AuthContext);

  /* aqui são os estados 
      tem como função receber o que foi digitado pelo usuário
      setEmail e setPassword são utilizados como função no evento do input       
  */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  // FormEvent é apenas para não recarregar a pagina
  // então isso altera o comportamento para não recarregar
  async function handleLogin(event: FormEvent){
    // utilizar preventDefault para não recarregar a pagina
    event.preventDefault();

    if (email === '' || password === ''){
      toast.warning('Preencha os campos.')
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data);

    setLoading(false);
  }

  return (
    // utilizar este padrão
    // tag vazia = fragment
    <>
      <Head>
        <title>
          DyManager - Acesse sua conta
        </title>
      </Head>

      <div className={styles.logo}>
        <a>DynamicTech</a>
      </div>

      <div className={styles.containerCenter}>

        <a className={styles.logo2}>DyManager</a>
        <a className={styles.legend}>Management System</a>
        <div className={styles.login}>

          <form onSubmit={handleLogin}>
            <Input placeholder='Digite seu e-mail'
              type='text'
              value={email}
              onChange={ (e) => setEmail(e.target.value)}
            />

            <Input placeholder='Digite sua senha'
              type='password'
              value={password}
              onChange={ (e) => setPassword(e.target.value)}
            />              

            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>

          </form>

          <a className={styles.text}>Esqueci minha senha.</a>

        </div>

      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx)=> {   

  return {
    props: {      
    }
  }
})