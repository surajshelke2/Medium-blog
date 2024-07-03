import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  content: string;
  title: string;
  id: Number;
  author: {
    name: string;
  };
}

export const useBlog = ({ id }: { id: Number }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
      axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
              Authorization: localStorage.getItem("token")
          }
      })
          .then(response => {
              setBlog(response.data.post);
           
              setLoading(false);
             
          })
  }, [id]);{

    return{
      blog,
      loading
    }

  }}

export function useBlogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlog] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      })
      .then((res) => {
        setBlog(res.data.blogs);
       ;
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
}
