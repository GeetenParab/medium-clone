import {  useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";




export interface Blog {
              "content": string,
            "title": string,
            "id": number,
            "createdAt":string
            "author": {
                "name": string
                "id":string
            }
  
}

// export const UseBlog = ({id}:{id:string}) => {
 
//     const [loading,setloading] = useState(true);
//     const [blog,setBlog] = useState<Blog>()

//   const token = localStorage.getItem('token');
//   const objtoken = JSON.parse(token as string)

//     useEffect(()=>{
//                 axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
//                     headers:{
//                         Authorization: `bearer ${objtoken.jwt}`
//                     }
//                 })
//                 .then(response =>{
//                     setBlog(response.data.post);
//                     setloading(false);
//                 })
//     },[])



//     return {
//         loading,
//         blog
//     }
// }



const fetchBlog = async (id: string, token: string) => {
    const objtoken = JSON.parse(token);
  
    const { data } = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
      headers: {
        Authorization: `Bearer ${objtoken.jwt}`,
      },
    });
  
    return data.post; // Adjust based on your API response
  };

export const UseBlog = ({ id }: { id: string }) => {
  const token = localStorage.getItem("token") as string;

  const { data, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlog(id,token),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 1,
  });
  

  return { isLoading, data };
};


// export const UseBlogs = () => {
 
//     const [loading,setloading] = useState(true);
//     const [blogs,setBlogs] = useState<Blog[]>([])

//   const token = localStorage.getItem('token');
//   const objtoken = JSON.parse(token as string)

//     useEffect(()=>{
//                 axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
//                     headers:{
//                         Authorization: `bearer ${objtoken.jwt}`
//                     }
//                 })
//                 .then(response =>{
//                     setBlogs(response.data.blogs);
//                     setloading(false);
//                 })
//     },[])



//     return {
//         loading,
//         blogs
//     }
// }


// Fetch Blogs Function
const fetchBlogs = async ({ pageParam = 1 }) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found in localStorage");

  const objtoken = JSON.parse(token as string);

  const response = await axios.get(
    `${BACKEND_URL}/api/v1/blog/bulk?page=${pageParam}&limit=5`,
    {
      headers: {
        Authorization: `Bearer ${objtoken.jwt}`, // Ensure 'Bearer' has proper casing
      },
    }
  );

  return response.data;
};

// UseBlogs Hook
export const UseBlogs = () => {
  return useInfiniteQuery(
    ["blogs"],
    ({ pageParam = 1 }) => {
      console.log('Fetching page:', pageParam);
      return fetchBlogs({ pageParam });
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage && lastPage.currentPage < lastPage.totalPages) {
          return lastPage.currentPage + 1;
        }
        return undefined; // Stop fetching if no more pages
      },
      
      staleTime: 1000 * 60 * 1, // Data stays fresh for 1 minute
      cacheTime: 1000 * 60 * 5, // Data is cached for 5 minutes
      retry: 1, // Retry failed requests only once
    }
  );
};



export const useDelete = ({ id }: { id: string }) =>{

  const [ loading, setloading] = useState(true);
  
  const deleteBlog = async() :Promise<string> =>{


    try {
      const token  = localStorage.getItem("token")
      const tokenobj = JSON.parse(token as string); 
  
     const message  = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`,{
    
       headers:{
         Authorization: `Bearer ${tokenobj.jwt}`
       }
       
      })
      console.log(message)
      setloading(false);
       return message.data;
    }
      
     catch (error) {
      setloading(false);
      throw error;
    }
   
  }
         return {
          loading,
          deleteBlog
         }
}

