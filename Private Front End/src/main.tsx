import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './components/App'
import './styles/index.css'
import New from './components/New'
import Navbar from './components/Navbar'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/new' element={<New/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
