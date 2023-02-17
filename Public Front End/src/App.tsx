import { useState, useEffect } from 'react'
import banner from './assets/banner-placeholder.webp'
import { Link } from "react-router-dom"
import './App.css'

function App() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await (
        await fetch('http://localhost:3000/blogs', {
          method: 'GET',
        })
      ).json()

      setPosts(data)
      console.log(data)
    }

    fetchData()
  }, [])

  function generatePosts() {
    let postElementArray: Array<JSX.Element> = []
    if(posts.length > 0) {
      for(const i in posts) {
          postElementArray.push(
            <div className='post' key={i}>
              <div className='rectangle'></div>
              <img className='post-banner' src={posts[i].image || banner} alt="Banner Image" />
              <h2><Link to={posts[i].url}>{posts[i].title}</Link></h2>
              <p className='post-date'>{posts[i].formattedDate}</p>
              <p>{posts[i].content.slice(0, 150).trim()}...</p>
            </div>
          )
      }
    }
    return postElementArray
  }

return (
    <div className='App'>
      <section className='posts'>
        {generatePosts()}
      </section>
    </div>
  )
}

export default App
