import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import { Blogs } from "./pages/Blogs"
import { WriteBlog } from "./pages/WriteBlog"
import { About } from "./pages/About"


const App = () => {
  return (
    <>
     <BrowserRouter>
       <Routes>
         <Route path = '/signup'  element = {<Signup/>}/>
         <Route path = '/signin' element = {<Signin/>}></Route>
         <Route path = '/blogs' element = {<Blogs/>}></Route>
         <Route path = '/write-blog' element = {<WriteBlog/>}></Route>
         <Route path = '/about' element = {<About/>}></Route>
       </Routes>
     </BrowserRouter>
    </>
  )
}

export default App;