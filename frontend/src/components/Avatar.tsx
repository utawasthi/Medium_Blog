
interface AvatarProps {
  name : string;
  width : string;
  height : string;
}

export const Avatar = ({name , width , height} : AvatarProps) => {
  return (
    <div className = {`w-${width} h-${height} relative inline-flex items-center justify-center  overflow-hidden bg-gray-300 rounded-full`}>
      <span className = "font-medium text-gray-600 text-md">{(name && name.length > 0) ? name[0] : 'A'}</span>
    </div>
  )
}