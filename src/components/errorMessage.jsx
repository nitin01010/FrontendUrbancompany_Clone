import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import LoadingDotsBlue from '../assets/LoadingDotsBlue.gif';

const ErrorMessage = ({ error, isLoading }) => {
  if (isLoading) {
    // 🔄 Show skeletons and loading GIF while loading
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 space-y-4">
        <img
          src={LoadingDotsBlue}
          alt="Loading..."
          className="w-20 h-20 object-contain"
        />
        <Skeleton height={25} width={250} />
        <Skeleton height={20} width={180} />
        <Skeleton height={40} width={300} />
      </div>
    );
  }

  // ❌ Show error state
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 space-y-3">
      <img
        src={LoadingDotsBlue}
        alt="Error loading"
        className="w-24 h-24 object-contain mb-2"
      />
      <p className="text-red-600 font-semibold text-lg">
        ⚠️ Unable to connect to the server.
      </p>
      <p className="text-gray-600">
        {error?.message || "Something went wrong. Please try again later."}
      </p>
    </div>
  );
};

export default ErrorMessage;