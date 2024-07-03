import { AppBar } from "../../component/AppBar";
import { BlogCard } from "../../component/BlogCard";
import { useBlogs } from "../../hooks";

const Blogs = () => {
  const { loading, blogs} = useBlogs();
  
  console.log(blogs);
  return (
    <div className="">
      <AppBar here ={0} />
      <div className=" flex justify-center ">
        <div>
          
          
         {!blogs?loading:
         <div className="flex justify-center flex-col  max-w-xl text-justify gap-6">
         {blogs.map((blog: { id: any; author: { name: any; }; title: string; content: string; }) => (
          <BlogCard
            key={ blog.id}
            id={blog.id}
            authorName={blog.author.name || "Anonymous"}
            title={blog.title}
            content={blog.content}
            publishedDate={"2nd Feb 2024"}
          />
        ))}
        
        </div>}
          
        </div>
      </div>
    </div>
  );
};

export default Blogs;
