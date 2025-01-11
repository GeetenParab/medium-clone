const Skeleton2 = () => {
    return (
      <div>
        <div className="flex justify-center bg-gray-50 min-h-screen">
          <div className="grid grid-cols-12 px-6 w-full max-w-screen-2xl pt-12 gap-6">
            {/* Skeleton for Blog Content Section */}
            <div className="col-span-12 md:col-span-8 space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div> {/* Title Skeleton */}
              <div className="h-6 bg-gray-200 rounded w-1/4"></div> {/* Date Skeleton */}
              <div className="h-4 bg-gray-200 rounded w-full mt-4"></div> {/* Content Skeleton */}
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
  
            {/* Skeleton for Author Section */}
            <div className="col-span-12 md:col-span-4 bg-slate-50 rounded-lg p-6 space-y-4">
              <div className="h-6 bg-gray-200 rounded w-1/3"></div> {/* Author Header Skeleton */}
              <div className="flex items-center gap-4 mt-4">
                <div className="h-10 w-10 bg-gray-200 rounded-full"></div> {/* Avatar Skeleton */}
                <div className="space-y-2 w-full">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div> {/* Author Name Skeleton */}
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div> {/* Author Description Skeleton */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Skeleton2;
  