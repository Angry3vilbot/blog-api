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
    }
    fetchData()
  }, [])

  function generatePosts() {
    interface image {
      contentType: string
    }
    let postElementArray: Array<JSX.Element> = []
    if(posts.length > 0) {
      for(const i in posts) {
          let image: image = posts[i].image
          if(!image) {
            postElementArray.push(
              <div className='post' key={i}>
                <div className='rectangle'></div>
                <img className='post-banner' src={banner} alt="Banner Image" />
                <h2><Link to={posts[i].url}>{posts[i].title}</Link></h2>
                <p className='post-date'>{posts[i].formattedDate}</p>
                <p>{posts[i].content.slice(0, 150).trim()}...</p>
              </div>
            )
          } else {
            postElementArray.push(
              <div className='post' key={i}>
                <div className='rectangle'></div>
                <img className='post-banner' src={`data:${image.contentType};base64,
                ${posts[i].imageBuffer}`} alt="Banner Image" />
                <h2><Link to={posts[i].url}>{posts[i].title}</Link></h2>
                <p className='post-date'>{posts[i].formattedDate}</p>
                <p>{posts[i].content.slice(0, 150).trim()}...</p>
              </div>
            )
          }
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