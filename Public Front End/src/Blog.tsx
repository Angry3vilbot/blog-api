import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import placeholder from './assets/banner-placeholder.webp'
import './Blog.css'

function Blog() {
    interface BlogPost {
        title: string,
        content: string,
        formattedDate: string,
        image: any,
        imageBuffer: string
    }
    const [post, setPost] = useState<BlogPost>({title: '', content: '', formattedDate: '', image: {}, imageBuffer: ''})
    const { blogId } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            const data = await (
                await fetch(`http://localhost:3000/blog/${blogId}`, {
                method: 'GET',
                })
            ).json()
            console.log(data)
            setPost(data)
        }   

        fetchData()
    }, [])
    function checkImage(post: BlogPost) {
        if (post.image) {
            return `data:${post.image.contentType};base64,${post.imageBuffer}`
        }
        return placeholder
    }
  return (
    <div className='Blog'>
        <section className='blogpost'>
            <h2>{post.title}</h2>
            <p className='date'>{post.formattedDate}</p>
            <img src={checkImage(post)} alt="" />
            <p className='content'>{post.content}</p>
        </section>
        <section className='comments'>
            <h3>{32} Comments</h3>
        </section>
    </div>
  )
}

export default Blog