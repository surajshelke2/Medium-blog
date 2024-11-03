import { Blog } from "../hooks";
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogCard";

const SingulerBlog = ({ blog }: { blog: Blog }) => {
  return (
    <>
      <AppBar here={0} />
      <div className="flex justify-center bg-gray-50 min-h-screen py-10">
        <div className="grid grid-cols-12 gap-8 px-6 w-full max-w-screen-xl">
      
          <div className="col-span-8 bg-white p-8 shadow-lg rounded-lg">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
              {blog.title}
            </h1>
            <p className="text-sm text-slate-500 pb-4">
              Posted on 2nd December 2023
            </p>
            <div className="text-lg text-gray-700 leading-relaxed">
              {blog.content}
            </div>
          </div>

          {/* Sidebar Section */}
          <div className="col-span-4 bg-gray-100 p-6 shadow-md rounded-lg">
            <h2 className="text-slate-600 text-lg font-semibold mb-4">
              Author
            </h2>
            <div className="flex items-center">
              <div className="pr-4 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800">
                  {blog.author.name || "Anonymous"}
                </p>
                <p className="pt-2 text-slate-500 text-sm">
                  A catchphrase that draws users in with the author's unique style and personality.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingulerBlog;
