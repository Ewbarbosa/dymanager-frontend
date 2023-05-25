import { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'

import styles from './styles.module.scss'
import Link from 'next/link'

import { FiLogOut } from 'react-icons/fi'
import { FaBars } from 'react-icons/fa'

export function Header() {

  const { user, signOut } = useContext(AuthContext);

  return (
    <>
      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <Link href="/dashboard">
            <a className={styles.logo2}>DyManager</a>
          </Link>

          {/*<h1>{user?.name}</h1>*/}

          <nav className={styles.menuNav}>
            <Link href="/client">
              <a>Clientes</a>
            </Link>

            <Link href="/call">
              <a>Atendimentos</a>
            </Link>

            <button onClick={signOut}>
              <FiLogOut color="#fff" />
            </button>
          </nav>
        </div>
      </header>
    </>
  )
}