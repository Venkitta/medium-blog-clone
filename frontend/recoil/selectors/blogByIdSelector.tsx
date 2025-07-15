import { selectorFamily } from "recoil";
import { blogCacheAtom } from "../atoms/blogCacheAtom";
import { BACKEND_URL } from "../../config"
import { Blog } from "../../src/hooks"

export const blogByIdSelector = selectorFamily<Blog | null, string>({
    key: "blogByIdSelector",
    get: (blogId: string) => async ({ get }) => {
        const cache = get(blogCacheAtom);
        
        if (cache[blogId]){
            return cache[blogId]
        }

    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {};

    if (token) {
        headers.Authorization = token;
    }

    const res = await fetch(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
        headers
    });

    const data = await res.json();

    return data.blog;
    }
});