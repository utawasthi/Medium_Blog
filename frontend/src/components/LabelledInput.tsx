
interface LabelledInputTypes  {
  label : string;
  type : string;
  placeholder : string;
  value : string;
  onChange : (event : React.ChangeEvent<HTMLInputElement>) => void
}

export const LabelledInput = (props : LabelledInputTypes) => {

  const {label , placeholder , type , value , onChange} = props;

  return (
    <div className = 'mt-3'>
      <label className="block mb-2 text-md font-medium">
        {label}
      </label>
      <input 
        type = {type} 
        className="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 outline-none " placeholder = {placeholder} 
        value = {value}
        onChange = {onChange}
        required 
      />
    </div>
  )
}