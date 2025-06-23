import { LabelledInput } from "./LabelledInput"
import { useState } from "react"
import type { SigninInput } from "@utawasthi/common"
import { Button } from "./Button"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const SigninAuth = () => {
  
  const [postInputs , setPostInputs] = useState<SigninInput>({
    email : '',
    password : ''
  });

  const navigate = useNavigate();

  const signinReq = async () => {
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin` , postInputs);
      if(response) console.log(response);
      navigate('/blogs');
    }
    catch(error){
      alert('User Does Not Exist');
      console.log(error);
      navigate('/signup');
    }
  }

  return <div className = 'flex flex-col justify-center h-screen'>
    <div className = 'flex flex-col justify-center items-center px-4 gap-2'>
      <div className = 'font-bold text-3xl'>
        Create an Account
      </div>
      <div className = 'font-semilight text-slate-500 '>
        Don't have an account?
        <Link 
         to = '/signup'
         className = 'underline pl-1' 
        >
          Signup
        </Link>
      </div>
      <div className = 'w-3/5'>
        <LabelledInput label = 'Email' 
          type = 'text' 
          placeholder = 'm@example.com' 
          value = {postInputs.email}
          onChange = {(e) => {
            setPostInputs(c => ({
              ...c , 
              email : e.target.value
            }))
          }}
        />
        <LabelledInput label = 'Password' 
          type = 'password' 
          placeholder = '' 
          value = {postInputs.password}
          onChange = {(e) => {
            setPostInputs(c => ({
              ...c , 
              password : e.target.value
            }))
          }}
        />
        <Button content = "Sign In" onClick = {signinReq}/>
      </div>
    </div>
  </div>
}