import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './components/App'
import './styles/index.css'
import Blog from './components/Blog'
import Navbar from './components/Navbar'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='blog/:blogId' element={<Blog/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
