import React from 'react'
import Navbar from './components/navbar'
import Chat from './pages/chat'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './styles/App.css'
import CallBot from './pages/callbot'

const App = () => {
  // const location = new ReactLocation();
  return (
      <div className='app'>
        <Navbar/>
        <BrowserRouter>
          <Routes>
            <Route path='/bot/chat' element={<Chat/>}/>
            <Route path='/bot/call' element={<CallBot/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    
  )
}

export default App