import { useState, useEffect } from 'react'
import banner from '../assets/banner-placeholder.webp'
import { Link } from 'react-router-dom'
import '../styles/App.css'

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
              <div className='post' key={posts[i].date}>
                <div className='rectangle'></div>
                <img className='post-banner' src={banner} alt="Banner Image" />
                <h2><Link to={posts[i].url}>{posts[i].title}</Link></h2>
                <p className='post-date'>{posts[i].formattedDate}</p>
                {checkContentLength(posts[i].content)}
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
                {checkContentLength(posts[i].content)}
              </div>
            )
          }
      }
      postElementArray.sort((a, b) => {
        if (a.key! > b.key!) {
          return -1
        }
        return 1
      })
    }
    return postElementArray
  }

  function checkContentLength(content: string) {
    if(content.split('').length > 150) {
      return <p>{content.slice(0, 150).trim()}...</p>
    }
    return <p>{content}</p>
  }

  return (
    <div className="App">
      <h2>All Posts</h2>
      <div className='posts-container'>
        {generatePosts()}
      </div>
    </div>
  )
}

export default App
