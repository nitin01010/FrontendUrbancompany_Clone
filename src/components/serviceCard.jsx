import React from 'react';
import { useNavigate } from 'react-router-dom';

const ServiceCard = ({ item, id }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/service/${id}`)} 
      className='w-full max-w-[233px] h-[345px] rounded-md cursor-pointer p-2'
    >
      <img
        src={
          item?.cloudinaryImageId?.[0]
        }
        alt={item?.name || "Service image"}
        className="w-full h-[180px] object-cover rounded-md"
      />

      <p className='text-sm sm:text-base mt-3 font-medium'>
        {item?.name || "Unknown Service"}
      </p>

      <span className='mt-2 text-gray-600 flex gap-2 items-center text-sm'>
        <svg
          className='w-[12px] h-[12px]'
          viewBox='0 0 24 24'
          fill='#545454'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M12.923 2.616a1 1 0 00-1.846 0l-2.41 5.795-6.257.502a1 1 0 00-.571 1.756l4.767 4.084-1.457 6.105a1 1 0 001.494 1.086L12 18.672l5.357 3.272a1 1 0 001.494-1.086l-1.457-6.105 4.767-4.084a1 1 0 00-.57-1.756l-6.257-.502-2.41-5.795z' />
        </svg>
        <p>{item?.totalRatingsString || "No ratings"}</p>
      </span>

      <p className='mt-2 text-gray-600 font-semibold'>
        ₹ {item?.price || "N/A"}
      </p>
    </div>
  );
};

export default ServiceCard;
