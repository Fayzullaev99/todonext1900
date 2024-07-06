'use client'

import Image from "next/image";
import plus from "@/images/plus.svg";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Todos from "@/components/Todos";
import Empty from "@/components/Empty";
import Info from "@/components/Info";

export default function Home() {
  const [newNote, setNewNote] = useState('')
  const [edit, setEdit] = useState(null)
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/api/todo')
      .then((res) => res.json())
      .then((data) => {
        setTodos(data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
        setLoading(false)
      })
  }, [])

  async function addTodo(params) {
    if (!newNote.trim()) return
    const res = await fetch("http://localhost:3000/api/todo", {
      method: "POST",
      body: JSON.stringify({ text: newNote }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await res.json()
    setTodos([...todos, data])
    setNewNote("")
  }

  async function deleteTodo(id) {
    const res = await fetch("http://localhost:3000/api/todo", {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.status == 200) {
      setTodos(todos.filter(todo => todo._id != id))
      setEdit(null)
    }
  }

  async function editTodo(todo) {
    setEdit(todo)
  }

  async function updateTodo() {
    if (!edit) return
    const res = await fetch("http://localhost:3000/api/todo", {
      method: "PUT",
      body: JSON.stringify({ id: edit._id, text: edit.text, check: edit.check }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.status == 200) {
      setTodos(todos.map(todo => todo._id == edit._id ? { ...todo, text: edit.text } : todo))
      setEdit(null)
    }
  }

  async function checkTodo(todo) {
    const res = await fetch("http://localhost:3000/api/todo", {
      method: "PUT",
      body: JSON.stringify({ ...todo, id: todo._id, check: !todo.check }),
      headers:{
        'Content-Type':"application/json"
      }
    })
    if (res.status == 200) {
      setTodos(todos.map(el => el._id == todo._id ? {...el,check:!todo.check} : el))
    }
  }

  return (
    <div className={styles.main}>
      <div className="container">
        {edit ? (
          <div className={styles.main__input}>
            <input
              type="text"
              placeholder="write your note"
              value={edit?.text}
              onChange={(e) => setEdit({ ...edit, text: e.target.value })}
            />
            <button onClick={updateTodo}>Edit <Image src={plus} alt="edit note" /></button>
          </div>
        ) : (
          <div className={styles.main__input}>
            <input
              type="text"
              placeholder="write your note"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <button onClick={addTodo}>Create <Image src={plus} alt="create note" /></button>
          </div>
        )}
        {
          loading ? <Loader /> : todos.length > 0 ? (
            <>
              <Info data={todos} />
              <Todos todos={todos} handle={{ deleteTodo, editTodo, checkTodo }} />
            </>
          ) : (
            <>
              <Info data={todos} />
              <Empty />
            </>
          )
        }
      </div>
    </div>
  );
}
