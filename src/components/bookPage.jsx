import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { fetchData } from '../api/api';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const locationIQKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;

const BookPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
  });
  const [errors, setErrors] = useState({});
  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const { id } = useParams();

  const createUserMutation = useMutation({
    mutationFn: (data) =>
      fetchData(`${baseUrl}/account/profile/create/user/new`, 'POST', {
        name: data.fullName,
        number: data.phone,
        location: data.location,
        id,
      }),
    onSuccess: () => {
      toast.success('✅ OTP sent successfully!');
      setShowOtpModal(true);
    },
    onError: (error) => {
      toast.error(error?.message || "❌ Failed to send OTP");
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: ({ number, otp }) =>
      fetchData(`${baseUrl}/account/profile/verify`, 'POST', {
        number,
        otp,
        name: formData.fullName,
        location: formData.location,
        id,
      }),
    onSuccess: (data) => {
      toast.success('✅ OTP Verified Successfully!');
      sessionStorage.setItem("auth", data?.token);
      setFormData({ fullName: '', phone: '', location: '' });
      setOtp('');
      setShowOtpModal(false);
    },
    onError: (error) => {
      toast.error(error?.message || "❌ Invalid OTP");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));

    if (name === 'location') fetchSuggestions(value);
  };

  const fetchSuggestions = async (query) => {
    if (!query) return setSuggestions([]);
    try {
      const res = await axios.get(`https://api.locationiq.com/v1/autocomplete`, {
        params: {
          key: locationIQKey,
          q: query,
          limit: 5,
          countrycodes: 'in',
          normalizecity: 1,
        },
      });
      setSuggestions(res.data);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
  };

  const handleLocationSelect = (value) => {
    setFormData((prev) => ({ ...prev, location: value }));
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      createUserMutation.mutate(formData);
    }
  };

  const handleVerifyOtp = () => {
    if (!otp.trim()) return toast.warn("Please enter the OTP");
    verifyOtpMutation.mutate({ number: formData.phone, otp });
  };

  return (
    <div className='max-w-md mx-auto relative'>
      <form onSubmit={handleSubmit}>
        <p className='text-base py-2 px-1'>Full Name</p>
        <input
          name='fullName'
          type='text'
          placeholder='Jon Doe'
          value={formData.fullName}
          onChange={handleChange}
          className={`border-none px-2 w-full font-light bg-[#f2f2f2] outline-none py-2 rounded-md ${errors.fullName ? 'border border-red-500' : ''}`}
        />
        {errors.fullName && <span className='text-sm text-red-600'>{errors.fullName}</span>}

        <p className='text-base py-2 px-1 mt-2'>Phone</p>
        <input
          name='phone'
          type='tel'
          placeholder='93113302***'
          value={formData.phone}
          onChange={handleChange}
          className={`border-none px-2 w-full font-light bg-[#f2f2f2] outline-none py-2 rounded-md ${errors.phone ? 'border border-red-500' : ''}`}
        />
        {errors.phone && <span className='text-sm text-red-600'>{errors.phone}</span>}

        <div className='flex flex-col relative'>
          <p className='text-base py-2 px-1 mt-2'>Location</p>
          <MapPin className='absolute top-14 left-2 text-gray-500' />
          <input
            name='location'
            type='text'
            placeholder='e.g. Delhi, India'
            value={formData.location}
            onChange={handleChange}
            autoComplete='off'
            className={`border-none px-10 w-full font-light bg-[#f2f2f2] outline-none py-2 rounded-md ${errors.location ? 'border border-red-500' : ''}`}
          />
          {errors.location && <span className='text-sm text-red-600'>{errors.location}</span>}

          {/* Suggestion dropdown */}
          {suggestions.length > 0 && (
            <ul className='absolute top-full left-0 z-10 w-full bg-white border shadow-md max-h-48 overflow-y-auto rounded-md'>
              {suggestions.map((item, idx) => (
                <li
                  key={idx}
                  className='px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm'
                  onClick={() => handleLocationSelect(item.display_place || item.display_name)}
                >
                  {item.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type='submit'
          disabled={createUserMutation.isLoading}
          className='py-2 bg-black w-full mt-5 cursor-pointer rounded-md text-white transition hover:bg-gray-800'
        >
          {createUserMutation.isLoading ? 'Submitting...' : 'Book now'}
        </button>
      </form>

      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white w-full max-w-sm mx-auto p-6 rounded-lg text-center shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Enter 4-Digit OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
              maxLength={4}
              className="w-full border border-gray-300 p-3 mb-4 rounded text-center tracking-widest text-xl outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="----"
            />
            <button
              onClick={handleVerifyOtp}
              disabled={verifyOtpMutation.isLoading || otp.length !== 4}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {verifyOtpMutation.isLoading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <button
              onClick={() => setShowOtpModal(false)}
              className="text-sm mt-4 text-gray-500 underline hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookPage;
