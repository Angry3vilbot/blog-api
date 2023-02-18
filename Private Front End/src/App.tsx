import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {

  return (
    <div className="App">
      <form action="http://localhost:3000" method="post" encType='multipart/form-data'>
        <label htmlFor="title">Post Title</label>
        <input type="text" name="title" id="title" />
        <label htmlFor="content">Post Content</label>
        <textarea name="content" id="content"></textarea>
        <label htmlFor="imageUpload">Image</label>
        <input type="file" name="imageUpload" id="imageUpload" />
        <button type="submit">Submit Post</button>
      </form>
    </div>
  )
}

export default App
