import React from 'react';

const ReviewCard = ({ item, id }) => {
  return (
    <div key={id} className="flex p-2  flex-col rounded-lg bg-white min-w-[360px] shadow-sm border border-slate-200">
      <div className="flex items-center gap-4 text-slate-800">
        <img
          src={item?.avg}
          alt="Tania Andrew"
          className="h-[38px] w-[38px] rounded-full object-cover object-center"
        />
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between">
            <h5 className="text-xl font-semibold text-slate-800">{item?.name}</h5>
            <div className="flex items-center gap-1">
              {/* {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 text-yellow-600"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 
                     2.424 0l2.082 5.007 5.404.433c1.164.093 
                     1.636 1.545.749 2.305l-4.117 3.527 
                     1.257 5.273c.271 1.136-.964 
                     2.033-1.96 1.425L12 18.354 
                     7.373 21.18c-.996.608-2.231-.29-1.96-1.425
                     l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212
                     .749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              ))} */}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-base text-slate-600 font-light leading-normal">
          {`"${item?.message}"`}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
