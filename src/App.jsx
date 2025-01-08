import { useState } from 'react'
import './App.css'
import {Header,Footer} from './components'
function App() {

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow'>
        <h1>Welcome to MyApp</h1>
        <p>This is the main content of the page.</p>
      </main>
      <Footer />
    </div>
  )  
} 

export default App
 