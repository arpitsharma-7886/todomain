import { useState } from 'react'
import './App.css'
import TodoList from './TodoList'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TodoList />
      <ToastContainer  autoClose={3000} pauseOnHover={false}/>
    </>
  )
}

export default App
