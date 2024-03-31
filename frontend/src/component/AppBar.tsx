import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export function AppBar({ here = 1 }: { here: Number }) {
  return (
    <>
      <div className="border-b flex justify-between px-10 py-4">
        <Link
          to={"/blogs"}
          className="flex flex-col text-2xl font-serif justify-center cursor-pointer font-semibold"
        >
          Medium
        </Link>

        <div className="flex items-center gap-2 justify-center">
          {here == 0 ? (
            <>
             <Link to={`/publish`}>
              <button
                type="button"
                className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
              >
                New Post
              </button>
            </Link>
            
            
            </>
          ) : (
            <Link to={`/publish`}>
              <button
                type="button"
                className="mt-2 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
              >
                Publish
              </button>
            </Link>
          )}
          <Avatar size={"big"} name="harkirat" />
        </div>
      </div>
    </>
  );
}
