import { useState, useEffect, useCallback, useRef } from 'react'
import banner from '../assets/banner-placeholder.webp'
import { Link } from 'react-router-dom'
import '../styles/App.css'

function App() {
  const [posts, setPosts] = useState<any[]>([])
  const [deletionId, setDeletionId] = useState<String>('')
  const deletionWarning = useRef<HTMLDivElement>(null)

  const fetchData = useCallback(async () => {
    const data = await (
      await fetch('http://localhost:3000/blogs/admin', {
        method: 'GET',
      })
    ).json()
    setPosts(data)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])
  
  async function changeHiddenStatus(ev: React.MouseEvent, _id: String) {
    const target = ev.currentTarget
    target.innerHTML = 'Please Wait'
    target.setAttribute('disabled', '')
    await fetch(`http://localhost:3000/blog/${_id}/hide`, {
      method: 'POST'
    }).then(async () => {
      await fetchData()
      target.removeAttribute('disabled')
    })
  }

  function revealDeleteWarning(ev: React.MouseEvent, _id: String) {
    setDeletionId(_id)
    deletionWarning.current!.classList.remove('hidden')
  }

  async function deletePost(ev: React.MouseEvent) {
    const target = ev.currentTarget
    target.innerHTML = 'Please Wait'
    target.setAttribute('disabled', '')
    await fetch(`http://localhost:3000/blog/${deletionId}/delete`, {
      method: 'POST'
    }).then(async () => {
      await fetchData()
      target.removeAttribute('disabled')
      target.innerHTML = 'Yes, delete'
      deletionWarning.current!.classList.add('hidden')
    })
  }
  
  function cancelDeletion() {
    setDeletionId('')
    deletionWarning.current!.classList.add('hidden')
  }

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
              <div className={`post ${posts[i].isHidden ? 'hidden' : ''}`} key={i}>
                <div className='rectangle'></div>
                <img className='post-banner' src={banner} alt="Banner Image" />
                <h2><Link to={posts[i].url}>{posts[i].title}</Link></h2>
                <p className='post-date'>{posts[i].formattedDate}</p>
                {checkContentLength(posts[i].content)}
                <div className='post-buttons'>
                  {(() => {
                    if (!posts[i].isHidden) {
                      return <button onClick={(ev) => changeHiddenStatus(ev, posts[i]._id)}>Hide</button>
                    }
                    return <button onClick={(ev) => changeHiddenStatus(ev, posts[i]._id)}>Unhide</button>
                  })()}
                  <form action={`/${posts[i]._id}/edit`} method="get">
                    <button type="submit">Edit</button>
                  </form>
                  <button onClick={(ev) => revealDeleteWarning(ev, posts[i]._id)}>Delete</button>
                </div>
              </div>
            )
          } else {
            postElementArray.push(
              <div className={`post ${posts[i].isHidden ? 'hidden' : ''}`} key={i}>
                <div className='rectangle'></div>
                <img className='post-banner' src={`data:${image.contentType};base64,
                ${posts[i].imageBuffer}`} alt="Banner Image" />
                <h2><Link to={posts[i].url}>{posts[i].title}</Link></h2>
                <p className='post-date'>{posts[i].formattedDate}</p>
                {checkContentLength(posts[i].content)}
                <div className='post-buttons'>
                  {(() => {
                    if (!posts[i].isHidden) {
                      return <button onClick={(ev) => changeHiddenStatus(ev, posts[i]._id)}>Hide</button>
                    }
                    return <button onClick={(ev) => changeHiddenStatus(ev, posts[i]._id)}>Unhide</button>
                  })()}
                  <form action={`/${posts[i]._id}/edit`} method="get">
                    <button type="submit">Edit</button>
                  </form>
                  <button onClick={(ev) => revealDeleteWarning(ev, posts[i]._id)}>Delete</button>
                </div>
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
      <div className="deletion-warning hidden" ref={deletionWarning}>
        <h4>Warning</h4>
        <p>Are you sure you want to delete this post?</p>
        <div className="btn-container">
          <button onClick={deletePost}>Yes, delete</button>
          <button onClick={cancelDeletion}>No, cancel</button>
        </div>
      </div>
      <Link to={'/new'} className='new-post'>
        <button>New Post</button>
      </Link>
      <h2>All Posts</h2>
      <div className='posts'>
        {generatePosts()}
      </div>
    </div>
  )
}

export default App
