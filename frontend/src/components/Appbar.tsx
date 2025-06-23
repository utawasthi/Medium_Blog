import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

export const Appbar = () => {
  return (
    <div className = 'flex justify-between p-3 border-b'>
      <div className = 'font-extrabold text-3xl italic'>
        Echo
      </div>
      <div className = 'flex justify-center items-center gap-10 px-3'>
        <div>
          <Link to = '/about' className = 'text-gray-500 font-light'>
            Our Story
          </Link>
        </div>
        <div>
          <Link to = '/write-blog' className = 'text-gray-500 font-light'>
            Write
          </Link>
        </div>
        <div>
          <Avatar name = "Utkarsh" height = '8' width = '8'/>
        </div>
      </div>
    </div>
  )
}