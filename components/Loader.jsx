import styles from './components.module.css'

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__spinner}></div>
    </div>
  )
}

export default Loader