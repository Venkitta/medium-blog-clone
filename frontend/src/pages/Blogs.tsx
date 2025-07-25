import { Navigate } from "react-router-dom";
import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/signin" replace />;
    }

    if(loading){
        return <div>
            <Appbar />
        <div className="flex justify-center">    
            <div className="flex flex-col justify-center w-screen max-w-screen-md">
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
                <BlogSkeleton />
            </div>
        </div>
        </div>
    }

    return <div>
        <Appbar />
        <div className="flex justify-center">
        <div>
            {blogs.map(blog => <BlogCard 
                key={blog.id}
                id={blog.id}
                authorName = {blog.author.name}
                title = {blog.title}
                content={blog.content}
                publishedDate= {"Dec 4,2023"}
            />)}
        </div>
        </div>
    </div>
}

