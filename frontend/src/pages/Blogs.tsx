import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks/useBlogs"

export const Blogs = () => {

  const {loading , error , blogs} = useBlogs();

  if(loading){
    return <div>
      Loading.... 
      Wait a bit !
    </div>
  }

  if(error) console.log(error);

  return (
    <div>
      <Appbar/>
      <div className = 'flex flex-col gap-3  p-10 max-w-4xl'>
        {
          blogs.map((blog) => (
            <BlogCard 
              key = {blog.id}
              authorName = {blog.author.name}
              publishedDate = {"Jun 23 , 2025"}
              title = {blog.title}
              content = {blog.content}
            />
          ))
        }
      </div>
    </div>
  )
}