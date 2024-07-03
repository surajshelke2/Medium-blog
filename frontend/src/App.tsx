
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Signup from './Pages/Auth/Signup'
import Blogs from './Pages/BLog/Blogs'
import Publish from './Pages/BLog/Publish'
import { Signin } from './Pages/Auth/Signin'
import { Blog } from './Pages/BLog/Blog';
function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/publish" element={<Publish />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
      
    </>
  )
}

export default App
