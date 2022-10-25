import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/home.module.scss'

// logo do sistema
import logo from '../../public/logo.png'

// componentes
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

/* contexto */
import { AuthContext } from '../contexts/AuthContext'
import { useContext, FormEvent} from 'react'

export default function Home() {

  // aqui é chamada a funçao sigIn do context
  const { signIn } = useContext(AuthContext);

  // FormEvent é apenas para não recarregar a pagina
  // então isso altera o comportamento para não recarregar
  async function handleLogin(event: FormEvent){
    // utilizar preventDefault para não recarregar a pagina
    event.preventDefault();

    let data = {
      email: 'teste@teste.com',
      password: '123'
    }

    await signIn(data);
  }

  return (
    // utilizar este padrão
    // tag vazia = fragment
    <>
      <Head>
        <title>
          DyManager - Faça seu login
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
            />

            <Input placeholder='Digite sua senha'
              type='password' />

            <Button
              type="submit"
              loading={false}
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
