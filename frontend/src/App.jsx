import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Shorter from './pages/Shorter'
import {Toaster} from 'react-hot-toast'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* <Toaster/> */}
       <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/shorter" element={<Shorter/>} />
       </Routes>
    </>
  )
}

export default App
