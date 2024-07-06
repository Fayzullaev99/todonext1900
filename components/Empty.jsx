import Image from 'next/image'
import empty from '@/images/empty.png'
import styles from './components.module.css'

const Empty = () => {
  return (
    <div className={styles.empty}>
      <Image src={empty} alt='empty' className={styles.empty__image} />
      <div className={styles.empty__info}>
        <h3>You don&apos;t have tasks registered yet</h3>
        <p>Create tasks and organize your to-do items</p>
      </div>
    </div>
  )
}

export default Empty