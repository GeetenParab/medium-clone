import axios from "axios";
import { useState } from "react";
import Appbar from "../components/Appbar";
import { BACKEND_URL } from "../config";
import { useNavigate, useLocation } from "react-router-dom";
import Skeleton2 from "../components/Skeleton2";
import { useQueryClient } from "@tanstack/react-query";
const Publish = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  // Check if we are editing a blog (via location state)
  const blogToEdit = location.state?.blog || null;
     

  console.log(blogToEdit)
  const [title, setTitle] = useState(blogToEdit?.title || "");
  const [content, setContent] = useState(blogToEdit?.content || "");
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const objtoken = JSON.parse(token as string);

      let response;

      console.log(blogToEdit?.id)
      if (blogToEdit?.id) {
        // Edit blog (PUT request)
        response = await axios.put(
          `${BACKEND_URL}/api/v1/blog/${blogToEdit.id}`,
          { title, content },
          {
            headers: {
              Authorization: `Bearer ${objtoken.jwt}`,
            },
          }
        );
        setLoading(true)
        // queryClient.invalidateQueries(["blog", blogToEdit.id]);
        queryClient.refetchQueries(["blog"]);
        setLoading(false)
        // queryClient.invalidateQueries(["blogs"]);
        queryClient.invalidateQueries(["blogs",{ pageParam: 1 }]);
       
          navigate(`/blog/${response.data.id}`, { replace: true });
      } else {
        // Create new blog (POST request)
        response = await axios.post(
          `${BACKEND_URL}/api/v1/blog`,
          { title, content },
          {
            headers: {
              Authorization: `Bearer ${objtoken.jwt}`,
            },
          }
        );
        queryClient.invalidateQueries(["blogs",{ pageParam: 1 }]);
        navigate(`/blog/${response.data.id}`,{ replace: true });
      }

    
    } catch (error) {
      const errorMessage =
      (error as any)?.response?.data?.message || "An error occurred while publishing!";
    alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Appbar />
        <Skeleton2 />
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center items-center bg-gray-50 min-h-screen px-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-xl p-10">
          {/* Blog Title */}
          <input
            type="text"
            placeholder="Enter your title here..."
            className="w-full text-4xl font-bold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-gray-500 pb-4 mb-8"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Blog Content */}
          <textarea
            placeholder="Start writing your story..."
            className="w-full h-[600px] resize-none text-lg text-gray-700 border-none focus:outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          {/* Publish Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handlePublish}
              className={`bg-black text-white px-8 py-3 text-lg rounded-md hover:bg-gray-800 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : blogToEdit ? "Update" : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;
