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
          <Link className={styles.logo2} href="/dashboard">
            DyManager
          </Link>

          <button className={`${styles.hamburger} ${active ? styles.x : ""}`} onClick={activeMenu}></button>

          <ul className={`${styles.list} ${active ? styles.active : ""}`}>
            <li onClick={activeMenu}>
              <Link href="/dashboard">
                Home
              </Link>
            </li>

            <li onClick={activeMenu}>
              <Link href="/clients">
                Clientes
              </Link>
            </li>

            <li onClick={activeMenu}>
              <Link href="/adverse">
                Adversos
              </Link>
            </li>

            <li onClick={activeMenu}>
              <Link href="/process">
                Processos
              </Link>
            </li>

            <li>
              <Link href="/about">
                Sobre
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