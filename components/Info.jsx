import styles from './components.module.css'

const Info = ({data}) => {
  return (
    <div className={styles.info}>
      <div className={styles.info__box}>
        <h3 className={styles.info__title}>Tasks created</h3>
        <p className={styles.info__number}>{data.length}</p>
      </div>
      <div className={styles.info__box}>
        <h3 className={styles.info__title}>Completed</h3>
        <p className={styles.info__number}>{data.filter((todo)=>todo.check ==true).length} / {data.length}</p>
      </div>
    </div>
  )
}

export default Info