import BookPage from './bookPage';
import ServiceAbout from './serviceAbout';

const ServicePackage = () => {
    return (
        <div className='  w-full  m-auto lg:w-[82%] py-5 mt-5 mb-5 p-1 sm:p-0'>
            <div className=' flex  flex-wrap lg:flex-nowrap    gap-2'>
                <div className=' w-full  lg:w-[70%] '>
                    <ServiceAbout  />
                </div>
                <div className='rounded w-full lg:w-[30%] p-1'>
                    <BookPage />
                </div>
            </div>
        </div>
    )
}

export default ServicePackage



