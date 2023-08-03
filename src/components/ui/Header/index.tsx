import { useContext, useState } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'

import styles from './styles.module.scss'
import Link from 'next/link'

import { FiLogOut } from 'react-icons/fi'
import { FaBars, FaTimes } from 'react-icons/fa'

export function Header() {

  const { user, signOut } = useContext(AuthContext);
  const [active, setActive] = useState(false);

  // função para alternar entre true e false
  // escondendo e exibindo o menu
  const activeMenu = () => {
    setActive(!active);
    //alert(active)
  }

  return (
    <>
      <header className={styles.header}>

        {/*<h1>{user?.name}</h1>*/}

        <nav className={styles.nav}>
          <Link href="/dashboard">
            <a className={styles.logo2}>DyManager</a>
          </Link>

          <button className={`${styles.hamburger} ${active ? styles.x : ""}`} onClick={activeMenu}></button>

          <ul className={`${styles.list} ${active ? styles.active : ""}`}>
            <li>
              <Link href="/dashboard">
                <a onClick={activeMenu}>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/client">
                <a onClick={activeMenu}>Clientes</a>
              </Link>
            </li>

            <li>
              <Link href="/process">
                <a>Processos</a>
              </Link>
            </li>

            <li>
              <Link href="/about">
                <a>Sobre</a>
              </Link>
            </li>

            <button onClick={signOut}>
              <FiLogOut size={24} color="#fff" />
            </button>
          </ul>

        </nav>
      </header>
    </>
  )
}