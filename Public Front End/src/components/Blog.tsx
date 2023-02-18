import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import placeholder from '../assets/banner-placeholder.webp'
import '../styles/Blog.css'

function Blog() {
    interface BlogPost {
        _id: string,
        title: string,
        content: string,
        formattedDate: string,
        image: any,
        imageBuffer: string
    }
    const [post, setPost] = useState<BlogPost>({_id: '', title: '', content: '', formattedDate: '', image: {}, imageBuffer: ''})
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
        document.title = `${post.title} - Angry3vilbot's Blog`
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
            <form action={`http://localhost:3000/post/${post._id}/comment`} method="post">
                <label htmlFor="username">Username</label>
                <input type="text" name='username' id='username' required />
                <label htmlFor="comment">Comment</label>
                <textarea name="comment" id="comment" required></textarea>
                <button type="submit">Submit</button>
            </form>
        </section>
    </div>
  )
}

export default Blog