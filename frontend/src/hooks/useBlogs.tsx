import axios from "axios";
import { BACKEND_URL } from "../config";
import { useEffect, useState } from "react";

interface BlogType {
  content : string;
  title : string;
  id : number;
  author : {
    name : string;
  }
}

export const useBlogs = () => {
  const [loading , setLoading] = useState(false);
  const [blogs , setBlogs] = useState<BlogType[]>([]);
  const [error , setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try{
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers : {
            authorization : localStorage.getItem('token')
          }
        });
        
        if(response.data){
          setLoading(false);
          console.log("list of blogs -->" , response.data.listOfBlogs)
          setBlogs(response.data.listOfBlogs);
        }
      }
      catch(err){
        console.log(err);
        setError(err + "");
        setLoading(false);
      }
    }

    fetchBlogs();
  } , []);

  return {
    loading , 
    error,
    blogs
  }
}