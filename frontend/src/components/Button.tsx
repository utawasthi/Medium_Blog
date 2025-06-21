interface buttonProps  {
  content : string;
}

export const Button = ({content} : buttonProps) => {
  return (
    <button type = "button" 
      className = "w-full text-white bg-[#000000] outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-3">
      {content}
    </button>
  )
}