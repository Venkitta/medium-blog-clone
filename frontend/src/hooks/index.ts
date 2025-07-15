import { useEffect, useState } from "react"
import { BACKEND_URL } from "../../config";
import axios from "axios";

export interface Blog {
    "content": string,
    "title": string,
    "id": number,
    "author": {
        "name": string
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.blogs);
                setLoading(false);                
                })

            .catch(err => {
                console.error("Error while fetching blogs:", err);
                setLoading(false);
                });
    },[])

    return {
        loading,
        blogs
    }
}