import Image from 'next/image';
import mark from '@/images/mark.svg';
import unmark from '@/images/unmark.svg';
import edit from '@/images/edit.svg';
import del from '@/images/delete.svg';
import styles from './components.module.css'

const Todos = ({todos, handle}) => {
  return (
    <div className={styles.todos}>
      {
        todos.map((todo)=>(
          <div key={todo._id} className={styles.todos__item}>
            <button className={styles.todos__complete} onClick={()=>handle.checkTodo(todo)}>
              <Image src={todo.check ? mark : unmark} alt='complete' />
            </button>
            <p className={todo.check ? styles.todos__text_active : styles.todos__text}>{todo.text}</p>
            <div className={styles.todos__button}>
              <button className={styles.todos__edit} onClick={()=>handle.editTodo(todo)}>
                <Image src={edit} alt='edit' />
              </button>
              <button className={styles.todos__delete} onClick={()=>handle.deleteTodo(todo._id)}>
                <Image src={del} alt='delete' />
              </button>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Todos