import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export function useBlog({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blogs?id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlog(res.data.blog);
        console.log(res.data);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
}

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
        console.log(res.data);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
}
