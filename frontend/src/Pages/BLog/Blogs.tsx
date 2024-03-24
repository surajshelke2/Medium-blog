import { AppBar } from "../../component/AppBar";
import { BlogCard } from "../../component/BlogCard";
import { useBlogs } from "../../hooks";

const Blogs = () => {
  const { loading, blogs} = useBlogs();
  return (
    <div className="">
      <AppBar />
      <div className=" flex justify-center ">
        <div>
          {blogs.map((blog: { id: any; author: { name: any; }; title: string; content: string; }) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"2nd Feb 2024"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
