import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Blog } from "./pages/Blog"
import { Blogs } from "./pages/Blogs"

import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Publish } from "./pages/Publish"
import { Suspense } from "react"
import { Appbar } from "./components/Appbar"
import { UserBlogSkeleton } from "./components/UserBlogSkeleton"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path = "/signup" element = {<Signup />} />
          <Route path = "/signin" element = {<Signin />} />
          <Route path = "/blog/:id"
             element = {
              <Suspense fallback={
                <div>
                  <Appbar />
                  <UserBlogSkeleton />
                </div>
              }>
                <Blog />
              </Suspense>} />
          <Route path = "/blogs" element = {<Blogs />} />
          <Route path = "/publish" element = {<Publish />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
