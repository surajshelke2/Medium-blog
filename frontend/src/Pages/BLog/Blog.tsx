import { useParams } from "react-router-dom";

import SingulerBlog from "../../component/SingulerBlog";
import { useBlog } from "../../hooks";

export const Blog = () => {
  const { id } = useParams();
  const {loading, blog} = useBlog({
      id: id || ""
  });

  if (loading || !blog) {
      return <div>
        
      
          <div className="h-screen flex flex-col justify-center">
              
              <div className="flex justify-center">
                  {/* <Spinner /> */}
              </div>
          </div>
      </div>
  }
  return <div>
      <SingulerBlog blog={blog} />
  </div>
}


