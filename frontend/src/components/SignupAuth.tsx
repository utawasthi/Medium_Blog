import { Link, useNavigate } from "react-router-dom"
import { LabelledInput } from "./LabelledInput"
import { useState } from "react"
import type { SignupInput } from "@utawasthi/common"
import { Button } from "./Button"
import axios from "axios"
import { BACKEND_URL } from "../config"

export const SignupAuth = () => {
  
  const [postInputs , setPostInputs] = useState<SignupInput>({
    email : '',
    name : '',
    password : ''
  });

  const navigate = useNavigate();

  const signupReq = async () => {
    try{
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup` , postInputs);
      const jwt = response.data.jwt;
      localStorage.setItem('token' , jwt);
      navigate('/blogs');
    }
    catch(error){
      console.log(error);
    }
  }

  return <div className = 'flex flex-col justify-center gap-2 h-screen'>
    <div className = 'flex flex-col justify-center items-center px-4'>
      <div className = 'font-bold text-3xl'>
        Create an Account
      </div>
      <div className = 'font-semilight text-slate-500 '>
        Already have an account?
        <Link 
         to = '/signin'
         className = 'underline pl-1' 
        >
          Login
        </Link>
      </div>
      <div className = 'w-3/5'>
        <LabelledInput label = 'Username' 
          type = 'text' 
          placeholder = 'Enter your username' 
          value = {postInputs.name || ""}
          onChange = {(e) => {
            setPostInputs(c => ({
              ...c , 
              name : e.target.value
            }))
          }}
        />

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
        <Button content = "Sign Up" onClick = {signupReq}/>
      </div>
    </div>
  </div>
}