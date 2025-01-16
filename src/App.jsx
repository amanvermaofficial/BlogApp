import { useState } from 'react'
import './App.css'
import {Header,Footer} from './components'
import Button from './components/Button'
import Login from './components/Login'
import { Outlet } from 'react-router-dom'
function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow '>
        <Outlet />
      </main>
      <Footer />
    </div>
  )  
} 

export default App
 