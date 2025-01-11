import { Link } from "react-router-dom";
import formatDate from "../utils/formatdate";


interface BlogcardProps {
           id:string, 
        authorname : string,
        title: string,
        content : string,
        publishedDate: string;
}
const BlogCard = ({
  id, 
  authorname,
  title,
  content,
  publishedDate,
}: BlogcardProps) => {
   

  const formattedDate = formatDate(publishedDate);
return (
  <div  className="p-6 border-b bg-white border-slate-200 rounded-lg  w-screen max-w-screen-md  hover:shadow-lg transition-shadow duration-300 ">
    <Link to={`/blog/${id}`}>
    <div className="flex items-center space-x-4">
      <Avatar name={authorname} size={8} />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-800">{authorname}</span>
        <span className="text-xs font-light text-slate-500">{formattedDate}</span>
      </div>
    </div>
    <div className="text-2xl font-bold text-slate-900 pt-4">{title}</div>
    <div className="text-base font-normal text-gray-600 pt-2">
      {content.slice(0, 100) + "...."}
    </div>
    <div className="text-slate-400 text-sm font-light pt-4">
      {`${Math.ceil(content.length / 100)} minute(s) read`}
    </div>
    </Link>
  </div>
);
};






export function Avatar({ name, size }: { name: string; size: number }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
      style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
    >
      <span className="font-xs text-gray-600 dark:text-gray-300">
        {name[0]}
      </span>
    </div>
  );
}




export default BlogCard