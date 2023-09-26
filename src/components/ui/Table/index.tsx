import styles from './styles.module.scss'

import { useState } from 'react';
import { TableHTMLAttributes } from 'react';
import DataTable, { TableColumn, createTheme } from 'react-data-table-component';

import { MdOutlineAddCircle } from 'react-icons/md'

const customStyles = {
  title: {
    style: {
      //fontColor: 'red',
      //fontWeight: '900',
    }
  },
  rows: {
    style: {
      //minHeight: '50px', // override the row height
    }
  },
  headCells: {
    style: {
      fontSize: '18px',
      fontWeight: '600',
      //paddingLeft: '0 8px'
    },
  },
  cells: {
    style: {
      fontSize: '16px',
      //paddingLeft: '0 8px',
    },
  },
};


// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme('solarized', {
  text: {
    primary: '#fff',
    secondary: '#2aa198',
  },
  background: {
    default: '#202024',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#555555',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
}, 'dark');

// interface para os dados que serão exibidos na tabela
interface DataRow {
  cnpjcpf: string;
  name: string;
  email: string;
}

type ClientProps = {
  name: string;
}

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  clients: ClientProps[];
}

export function Table({ clients }: TableProps) {

  const [clientList, setClientList] = useState(clients || []);

  // colunas da tabela
  const columns: TableColumn<DataRow>[] = [
    {
      name: 'CPF/CNPJ',
      selector: row => row.cnpjcpf,
      sortable: true
    },
    {
      name: 'Nome Completo',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'E-mail',
      selector: row => row.email
    }
  ]

  return (
    <div className={styles.container}>
      
      <DataTable
        title="Lista de Clientes"
        columns={columns}
        data={clientList}
        theme="solarized"
        customStyles={customStyles}
      />
    </div>
  )
}