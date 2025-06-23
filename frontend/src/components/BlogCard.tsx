import { Avatar } from "./Avatar";

interface BlogCardProps {
  authorName : string;
  publishedDate : string;
  title : string;
  content : string;
}

export const BlogCard = (props : BlogCardProps) => {

  const {authorName , publishedDate , title , content} = props;

  return <div className = 'border-b border-gray-300 m-2 p-5 flex flex-col gap-2'>
    <div className = 'bg-white flex items-center gap-1'>
      <Avatar name = {authorName} height = '6' width = '6'/>
      <div className = 'front-medium'>
        {authorName && authorName.length > 0 ? authorName : "Anonymous"}
      </div>
      <div className = 'h-8 rounded-full font-extrabold text-gray-400'>.</div>
      <div className = 'font-light text-gray-600'>
        {publishedDate}
      </div>
    </div>
    <div className = 'text-xl font-bold'>
      {title}
    </div>
    <div className = 'text-sm font-light '>
      {`${content.slice(0 , 200)} .....`}
    </div>
    <div className = 'text-sm font-light'>
      {`${Math.ceil(content.length / 100)} min(s) read`}
    </div>

  </div>
}