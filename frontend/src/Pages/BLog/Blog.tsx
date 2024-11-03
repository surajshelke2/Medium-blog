import { useParams } from "react-router-dom";
import SingulerBlog from "../../component/SingulerBlog";
import { useBlog } from "../../hooks";

export const Blog = () => {
  const { id } = useParams<{ id: string | undefined }>();


  const numericId = id ? Number(id) : 0;

  const { loading, blog } = useBlog({
    id: numericId,
  });

  if (loading || !blog) {
    return (
      <div className="h-screen flex flex-col justify-center">
        <div className="flex justify-center">
          {/* <Spinner /> */}
        </div>
      </div>
    );
  }

  return (
    <div>
      <SingulerBlog blog={blog} />
    </div>
  );
};
