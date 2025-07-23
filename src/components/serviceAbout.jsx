import React, { useEffect } from 'react'
import ReviewCard from './reviewCard'
import { useParams } from 'react-router-dom'
import { fetchData } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const ServiceAbout = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ['findService', id],
    queryFn: () => fetchData(`${baseUrl}/dapi/services/find`, 'POST', { id }),
    enabled: !!id
  });

  return (
    <>
      {/* Swiper Section */}
      {isLoading ? (
        <div className="w-full h-[300px] md:h-[400px]">
          <Skeleton height="100%" />
        </div>
      ) : (
        <SwipperPage data={data} />
      )}

      <div className='bg-white'>
        <h2 className='text-3xl font-bold mt-2 py-5'>
          {isLoading ? <Skeleton width={300} height={30} /> : data?.name}
        </h2>

        <p className='py-2 mb-2'>
          {isLoading ? <Skeleton count={2} /> : data?.description}
        </p>

        <ul className='flex flex-col gap-5 mt-6'>
          {isLoading
            ? Array(4).fill(0).map((_, idx) => (
                <li key={idx}><Skeleton width={250} /></li>
              ))
            : data?.list?.map((item, id) => (
                <li key={id}>✅ {item}</li>
              ))
          }
        </ul>

        <h2 className='text-3xl capitalize font-bold mt-5 py-5 md:py-10'>
          What Our Customers Are Saying
        </h2>

        <div className="MainContainer flex gap-2 md:gap-10 py-3 overflow-scroll">
          {isLoading
            ? Array(2).fill(0).map((_, idx) => (
                <div key={idx} className="min-w-[250px]">
                  <Skeleton height={150} />
                  <Skeleton count={2} />
                </div>
              ))
            : data?.review?.map((item) => (
                <div key={item?._id}>
                  <ReviewCard id={item?._id} item={item} />
                </div>
              ))
          }
        </div>
      </div>
    </>
  )
}

export default ServiceAbout

const SwipperPage = ({ data }) => {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {data?.cloudinaryImageId?.map((item, index) => (
        <SwiperSlide key={index}>
          <img
            src={item}
            alt={`Slide ${index}`}
            className="bg-white object-contain w-full h-[300px] md:h-[400px]"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
