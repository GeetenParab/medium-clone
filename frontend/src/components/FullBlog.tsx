
import { useQueryClient } from "@tanstack/react-query";
import {  useAuthContext } from "../context/AuthContext";
import { Blog } from "../hooks/Index";
import formatDate from "../utils/formatdate";
import Appbar from "./Appbar";
import { Avatar } from "./BlogCard";

import { useNavigate } from "react-router-dom";

interface FullBlogProps { 
  blog: Blog;
  deleteBlog: () => Promise<string>;
}

export const FullBlog = ({ blog, deleteBlog }: FullBlogProps) => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
 const queryClient = useQueryClient();
   /////////////////////////////////////////////
  //  console.log(authUser?.user?.id)
  //  console.log(blog.author.id);
   const loggedinuserId = authUser?.user.id || null;
   const isAuthor = loggedinuserId === blog?.author.id;
  //  console.log(isAuthor);

  const handleEdit = () => {
    navigate("/publish", { state: { blog } });
  };

  const handleDelete = async () => {
    try {
      const message = await deleteBlog();
      console.log(message);
      queryClient.invalidateQueries(["blogs",{ pageParam: 1 }]);
      navigate("/blogs");
    } catch (error) {
      console.error("Failed to delete blog:", error);
      // You might want to show an error message to the user here
    }
  };
  // console.log(blog.createdAt)
  const formatteddate  = formatDate(blog.createdAt);
  return (
    <div>
      <Appbar />

    {
      isAuthor && <div>

     <div
        className="absolute top-40 right-6 bg-slate-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-black transition"
        onClick={handleEdit}
      >
        Edit
      </div>
      <div
        className="absolute top-52 right-6 bg-slate-600 text-red-400 px-2 py-2 rounded-md cursor-pointer hover:bg-black transition"
        onClick={handleDelete}
      >
        Delete
      </div>


      </div>
    }

    
      
      <div className="flex justify-center bg-gray-50 min-h-screen pt-12">
        <div className="grid grid-cols-12 px-6 w-full max-w-screen-2xl gap-6">
          {/* Blog Content Section */}
          <div className="col-span-12 md:col-span-8">
            <div className="text-4xl md:text-5xl font-extrabold text-gray-800">
              {blog.title}
            </div>
            <div className="text-sm text-slate-500 pt-2">
             {formatteddate}
            </div>
            <div className="pt-4 text-gray-700 leading-relaxed">
              {blog.content}
            </div>
          </div>

          {/* Author Section */}
          <div className="col-span-12 md:col-span-4 bg-slate-50 rounded-lg p-6">
            <div className="text-lg font-semibold text-gray-800">Author</div>
            <div className="flex items-center gap-4 mt-4">
              <Avatar size={10} name={blog.author.name || "Anonymous"} />
              <div>
                <div className="text-xl font-bold text-gray-800">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500 text-sm">
                  Sharing timeless wisdom and creative thoughts.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
