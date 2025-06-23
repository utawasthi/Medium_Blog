import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { WriterCard } from "../components/WriterCard"
import { useBlogs } from "../hooks/useBlogs"
import { topics , writers} from "../utils/topicList"

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
    <div className = 'relative'>
      <div className = 'sticky top-0 z-50 bg-white'>
        <Appbar/>
      </div>
      <div className = 'grid grid-cols-1 lg:grid-cols-12'>
        <div className = 'flex flex-col gap-3 p-10 col-span-8 border-r'>
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
        <div className = 'hidden lg:block col-span-4'>
          <div className = 'sticky top-10 p-5 space-y-5 h-screen overflow-y-auto'>
            <div className = 'flex flex-col p-3'>
              <h3 className = 'font-semibold text-md p-2'>Recommended Topics</h3>
              <div className = 'p-3'>
                {
                  topics.map((t) => (
                    <TopicButton
                      topic = {t}
                    />
                  ))
                }
              </div>
            </div>
            <div className = 'flex flex-col p-3'>
              <div className = 'text-md font-semibold m-2'>Who to follow</div>
              <div>
                {
                  writers.map((x) => (
                    <div className = 'm-3'>
                      <WriterCard 
                        name = {x.name}
                        about = {x.about}
                      />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TopicButton = ({topic} : {topic : string}) => {
  return (
    <button type = "button" className = "py-2 px-4 me-2 mb-2 text-sm font-light text-gray-900 focus:outline-none bg-gray-100 rounded-full border">
      {topic}
    </button>
  )
}