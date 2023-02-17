import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Blog.css'

function Blog() {
    interface BlogPost {
        title: string,
        content: string,
        formattedDate: string,
    }
    const [post, setPost] = useState<BlogPost>({title: '', content: '', formattedDate: ''})
    const { blogId } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            const data = await (
                await fetch(`http://localhost:3000/blog/${blogId}`, {
                method: 'GET',
                })
            ).json()

            setPost(data)
        }   

        fetchData()
    }, [])
  return (
    <div className='Blog'>
        <section className='blogpost'>
            <h2>{post.title}</h2>
            <p className='date'>{post.formattedDate}</p>
            <p>{post.content}</p>
        </section>
        <section className='comments'></section>
    </div>
  )
}

export default Blog