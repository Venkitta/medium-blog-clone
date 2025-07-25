import { ChangeEvent, useState } from "react"
import { BACKEND_URL } from "../../config"
import { Appbar } from "../components/Appbar"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    return <div> 
        <Appbar />
        <div className="flex justify-center w-full pt-10">
            <div className="max-w-screen-lg w-full">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus: ring-blue-500 focus: border-blue-500 block p-3 my-2" placeholder="Title" />
                <TextEditor onChange={(e) => {
                    setDescription(e.target.value)}}/>
                <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content: description
                        }, {
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        })
                    navigate(`/blog/${response.data.id}`)
                    }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                    Publish post
                </button>
            </div>    
        </div>
    </div>
}

function TextEditor({ onChange }: {onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
    return <div>
                <div className="w-full mb-4 border border-gray-300">
                    <div className=" bg-white rounded-b-lg">
                        <label htmlFor="editor" className="sr-only">Publish post</label>
                        <textarea onChange={onChange} id="editor" rows={8} className="py-2 block w-full px-0 pl-2 text-sm text-gray-800 bg-white border-0 focus:outline-none" placeholder="Write an article..." required />
                    </div>
                </div>
             </div>
}