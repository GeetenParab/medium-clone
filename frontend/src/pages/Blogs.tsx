

import { useEffect } from "react";
import Appbar from "../components/Appbar"
import BlogCard from "../components/BlogCard"
import Skeleton from "../components/Skeleton"
import { UseBlogs } from "../hooks/Index"
import { debounce } from "lodash";


const Blogs = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = UseBlogs();


  // const handleScroll = debounce(() => {
  //   const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  //   if (scrollHeight - scrollTop <= clientHeight * 1.5 && hasNextPage && !isFetchingNextPage) {
  //     fetchNextPage();
  //   }
  // }, 200);
  const handleScroll = debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  
    // Track the previous scroll position to detect scroll direction
    let previousScrollTop = 0;
  
    if (scrollTop > previousScrollTop && scrollHeight - scrollTop <= clientHeight * 1.5 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage(); // Fetch next page only when scrolling down
    }
  
    // Update the previous scroll position
    previousScrollTop = scrollTop;
  },400);
  

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, [hasNextPage]);

  // console.log(data)
  
  if (isLoading) {
    // Render multiple skeleton loaders
    return (
      <div>
        <Appbar />
        <div className="flex justify-center cursor-pointer">
          <div className="cursor-pointer">
            {[...Array(5)].map((_, index) => (
              <Skeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }


  return (
    <div>
      <Appbar />
      <div className="flex justify-center bg-slate-50">
        <div>
          {data?.pages.map((page, i) => (
            <div key={i}>
              {page.blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  id={blog.id}
                  authorname={blog.author.name || "anonymous"}
                  title={blog.title}
                  content={blog.content}
                  publishedDate={blog.createdAt}
                />
              ))}
            </div>
          ))}
          {isFetchingNextPage && <Skeleton />}
          {!hasNextPage && (
            <div className="text-center text-gray-500 mt-4">
              No more blogs to load.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blogs