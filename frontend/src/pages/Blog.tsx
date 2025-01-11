import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { UseBlog, useDelete } from "../hooks/Index"

import Appbar from "../components/Appbar";
import Skeleton2 from "../components/Skeleton2";

const Blog = () => {
  const {id} = useParams();
  const {isLoading ,data} = UseBlog({
        id: id as string
  });
  const   {deleteBlog}    = useDelete({
     id: id || ""
  });
      
  if (isLoading) {
    // Render multiple skeleton loaders
    return (
      <div>
        <Appbar />
        <Skeleton2/>
      </div>
    );
  }
  if (!data) {
    return <div>Blog not found.</div>;
  }
  return (
    <div>
      <FullBlog blog={data} deleteBlog={deleteBlog} />
    </div>
  )
}

export default Blog