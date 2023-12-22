import styles from './styles.module.scss';

export function Table({ data }) {

  //console.log(data[0]);

  const keys = Object.keys(data[0]);

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.tHead}>
          <tr>
            {keys.map((item, index) => (
              <th className={styles.th} key={index}>{item}</th>
            ))}
          </tr>
        </thead>

        <tbody className={styles.tBody}>
          {data.map((obj, index) => (
            <tr key={index}>

              {keys.map((item, index) => {
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