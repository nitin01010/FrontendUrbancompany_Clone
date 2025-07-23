import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingSkeleton = () => {
  return (
    <div className="w-full px-2 md:px-10 py-10">
      {/* Top section skeleton */}
      <div className="flex flex-col md:flex-row justify-center gap-10">
        {/* Left */}
        <div className="w-full md:w-1/2 space-y-4">
          <Skeleton height={30} width="80%" />
          <Skeleton height={20} width="60%" />
          <Skeleton count={2} height={15} />

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-3 border rounded-md">
                <Skeleton height={50} />
                <Skeleton height={15} width="80%" className="mt-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-1/2 bg-amber-300 py-10 px-5 md:px-10 rounded">
          <Skeleton height={300} />
        </div>
      </div>

      {/* Scrollbar skeleton */}
      <div className="flex gap-6 mt-10 overflow-x-scroll">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} width={380} height={222} />
        ))}
      </div>

      {/* Most booked services skeleton */}
      <div className="mt-10">
        <Skeleton height={30} width={200} className="mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} height={150} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
