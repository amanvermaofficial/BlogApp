import { useEffect, useState } from 'react'
import './App.css'
import {Header,Footer} from './components'
import Button from './components/Button'
import Login from './components/Login'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import {login,logout} from './store/authSlice'

function App() {
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[dispatch])

  return !loading ? (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow flex'>
        <Outlet />
      </main>
      <Footer />
    </div>
  ):null  
} 

export default App
 