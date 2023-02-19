import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import placeholder from '../assets/banner-placeholder.webp'
import '../styles/Blog.css'
import { DateTime } from 'luxon'

function Blog() {
    interface BlogPost {
        _id: string,
        title: string,
        content: string,
        formattedDate: string,
        image: any,
        imageBuffer: string,
        comments: Array<BlogComment>
    }
    interface BlogComment {
        username: string,
        comment: string,
        date: Date
    }
    const [post, setPost] = useState<BlogPost>({_id: '', title: '', content: '', formattedDate: '', image: {}, imageBuffer: '', comments: []})
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

    useEffect(() => {
        document.title = `${post.title} - Angry3vilbot's Blog`
    }, [post])

    function checkImage(post: BlogPost) {
        if (post.image) {
            return `data:${post.image.contentType};base64,${post.imageBuffer}`
        }
        return placeholder
    }

    function formatCommentDate(date: Date) {
        date = new Date(date)
        return `${DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL)} ${DateTime.fromJSDate(date).toLocaleString(DateTime.TIME_24_SIMPLE)}`
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
            <h3>{post.comments.length} Comments</h3>
            <form action={`http://localhost:3000/blog/${post._id}`} method="post">
                <label htmlFor="username">Username</label>
                <input type="text" name='username' id='username' required />
                <label htmlFor="comment">Comment</label>
                <textarea name="comment" id="comment" required></textarea>
                <button type="submit">Submit</button>
            </form>
            {post.comments.map((comment) => (
                <div className='blog-comment' key={Math.random()}>
                    <h4>{comment.username}</h4>
                    <p>{comment.comment}</p>
                    <p className='blog-comment-date'>{formatCommentDate(comment.date)}</p>
                </div>
            ))}
        </section>
    </div>
  )
}

export default Blog