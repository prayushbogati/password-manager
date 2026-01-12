import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {

  return (
    <div>
      <Navbar />
      <div class="inset-0 -z-10 h-100vh w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]">
        <Manager />
      </div>
      <Footer />
    </div>
  )
}

export default App
