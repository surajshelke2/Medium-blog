import { useParams } from "react-router-dom";
import { AppBar } from "../../component/AppBar";
import { useBlog } from "../../hooks";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });

  if (loading) return <div>Loading...</div>;
  return (
    <div className="">
     
    </div>

    
  );
};

export default Blog;
