import React from 'react'
import '../styles/New.css'

function New() {
  return (
    <div className='New'>
        <h1>New Post</h1>
        <form action="http://localhost:3000" method="post" encType='multipart/form-data'>
            <label htmlFor="title">Post Title</label>
            <input type="text" name="title" id="title" />
            
            <label htmlFor="content">Post Content</label>
            <textarea name="content" id="content"></textarea>
            
            <label htmlFor="imageUpload">Image</label>
            <input type="file" name="imageUpload" id="imageUpload" />
            
            <button type="submit">Create Post</button>
        </form>
    </div>
  )
}

export default New