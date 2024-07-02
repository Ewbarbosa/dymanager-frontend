import styles from './styles.module.scss';

import { useState, useEffect } from 'react';

export function Table({ data }) {

  const [key, setKey] = useState([]);

  useEffect(() => {

    handleData();

  });

  const handleData = () => {
    if (data.length > 0) {
      //setKey(Object.keys(data[0]))
    }
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tHead}>
          <tr>
            {key.map((item, index) => (
              <th className={styles.th} key={index}>{item}</th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.tBody}>

          {data.map((obj, index) => (
            <tr key={index}>

              {key.map((item, index) => {
                const value = obj[item];
                return <td className={styles.td} key={index}>{value}</td>
              })}

            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}