const Skeleton = () => {
    return (
      <div className="p-6 border border-slate-200 rounded-lg shadow-md w-screen max-w-screen-md animate-pulse">
        <div className="flex items-center space-x-4">
          {/* Skeleton Avatar */}
          <div className="w-10 h-10 bg-slate-300 rounded-full"></div>
          {/* Skeleton Text */}
          <div className="flex flex-col space-y-2">
            <div className="w-24 h-4 bg-slate-300 rounded"></div>
            <div className="w-16 h-3 bg-slate-300 rounded"></div>
          </div>
        </div>
        {/* Skeleton Title */}
        <div className="w-3/4 h-6 bg-slate-300 rounded mt-4"></div>
        {/* Skeleton Content */}
        <div className="space-y-2 mt-2">
          <div className="w-full h-4 bg-slate-300 rounded"></div>
          <div className="w-5/6 h-4 bg-slate-300 rounded"></div>
          <div className="w-4/6 h-4 bg-slate-300 rounded"></div>
        </div>
        {/* Skeleton Footer */}
        <div className="w-20 h-3 bg-slate-300 rounded mt-4"></div>
      </div>
    );
  };
  
  export default Skeleton;
  