
interface AvatarProps {
  name : string;
  width : string;
  height : string;
}

export const Avatar = ({name , width , height} : AvatarProps) => {
  return (
    <div className = {`relative inline-flex items-center justify-center w-${width} h-${height} overflow-hidden bg-gray-100 rounded-full`}>
        <span className = "font-medium">
          {name && name.length > 0 ? name[0] : "A"}
        </span>
    </div>
  )
}