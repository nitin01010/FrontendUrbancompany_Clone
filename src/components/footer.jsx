import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import React from 'react';

const footerLinks = [
  { title: "About" },
  { title: "Careers" },
  { title: "Privacy Policy" },
  { title: "Terms & Conditions" },
];

const footerLinks2 = [
  { title: "Categories Near You" },
  { title: "Contact Us" },
];

const Footer = () => {
  return (
    <div className='bg-[#f2f2f2]'>
      <div className=' w-full md:w-[81%] py-5 p-2 m-auto'>
        <p className="text-3xl font-bold mt-5">
          InstFix<span className="text-blue-600">.com</span>
        </p>

        <div className='flex justify-between items-start flex-wrap gap-5 p-1 mt-5'>
          <DetailsInfo name={'Company'} footerLinks={footerLinks} />
          <DetailsInfo name={'For Professionals'} footerLinks={[{ title: 'Register as a Professional' }]} />
          <DetailsInfo name={'For Customers'} footerLinks={footerLinks2} />

          <div>
            <p className='text-2xl mt-5'>Social Links</p>
            <ul className='flex text-gray-700 gap-4 mt-4 text-sm font-light'>
              <li className='w-[35px] cursor-pointer h-[35px] bg-white rounded-full flex items-center justify-center'>
                <Twitter />
              </li>
              <li className='w-[35px] cursor-pointer h-[35px] bg-white rounded-full flex items-center justify-center'>
                <Facebook />
              </li>
              <li className='w-[35px] cursor-pointer h-[35px] bg-white rounded-full flex items-center justify-center'>
                <Instagram />
              </li>
              <li className='w-[35px] cursor-pointer h-[35px] bg-white rounded-full flex items-center justify-center'>
                <Linkedin />
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

const DetailsInfo = ({ name, footerLinks }) => {
  return (
    <div>
      <p className='text-2xl mt-5'>{name}</p>
      <ul className='text-gray-700 flex flex-col gap-3 text-sm font-light'>
        {footerLinks?.map((item, idx) => (
          <li key={idx} className={`${idx === 0 ? 'mt-5' : ''}`}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;