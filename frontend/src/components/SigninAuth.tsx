import { LabelledInput } from "./LabelledInput"
import { useState } from "react"
import type { SigninInput } from "@utawasthi/common"
import { Button } from "./Button"
import { Link } from "react-router-dom"

export const SigninAuth = () => {
  
  const [postInputs , setPostInputs] = useState<SigninInput>({
    email : '',
    password : ''
  });

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
        <Button content = "Sign In"/>
      </div>
    </div>
  </div>
}