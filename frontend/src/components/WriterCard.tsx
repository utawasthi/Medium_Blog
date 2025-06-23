import { Avatar } from "./Avatar";

interface WriterProps {
  name : string;
  about : string;
}

export const WriterCard = ({name , about} : WriterProps) => {

  return <div className = 'flex gap-4'>
    <div className = 'flex gap-2'>
       <div>
        <Avatar name = {name} width = '8' height = '8'/>
       </div>
       <div>
        <div className = 'font-bold text-base cursor-pointer'>
          {name}
         </div>
        <div className = 'font-light text-gray-500 text-sm'>
          {`${about.slice(0 , 32)}...`}
        </div>
      </div>
    </div>
    <div>
      <FollowButton topic = 'Follow'/>
    </div>
  </div>
}

const FollowButton = ({topic} : {topic : string}) => {
  return (
    <button type = "button" className = "py-2 px-4 me-2 mb-2 text-sm font-light text-gray-900 focus:outline-none rounded-full border border-black cursor-pointer">
      {topic}
    </button>
  )
}