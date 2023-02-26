import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function Edit() {
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
    
    return (
        <div className="edit">
            <form action={`http://localhost:3000/blog/${blogId}/edit`} method="post" encType='multipart/form-data'>
                <label htmlFor="title">Post Title</label>
                <input type="text" name="title" id="title" defaultValue={post.title} />
            
                <label htmlFor="content">Post Content</label>
                <textarea name="content" id="content" defaultValue={post.content}></textarea>
            
                <label htmlFor="imageUpload">Image</label>
                <input type="file" name="imageUpload" id="imageUpload" />
            
                <button type="submit">Update Post</button>
            </form>
        </div>
    )
}

export default Edit