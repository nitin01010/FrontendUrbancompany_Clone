import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { fetchData } from '../api/api';
import { toast } from 'react-toastify';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);

  // ✅ Send OTP Mutation
  const sendOtpMutation = useMutation({
    mutationFn: () =>
      fetchData(`${baseUrl}/account/profile/create/user/new`, 'POST', {
        number: phone,
      }),
    onSuccess: (response) => {
      if (response?.success) {
        setOtpSent(true);
        toast.success(response.message || 'OTP Sent Successfully!');
      } else {
        toast.error(response.message || 'Something went wrong.');
      }
    },
    onError: (error) => {
      const backendError =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        'Something went wrong!';
      toast.error(backendError);
    },
  });

  // ✅ Verify OTP Mutation
  const verifyOtpMutation = useMutation({
    mutationFn: () =>
      fetchData(`${baseUrl}/account/profile/verify`, 'POST', {
        number: String(phone),
        otp: String(otp.join('')),
      }),
    onSuccess: (response) => {
      if (response?.success) {
        toast.success(response.message || 'OTP Verified!');
        sessionStorage.setItem('auth', response?.token);

        // ✅ Reset form and refresh page
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(response.message || 'OTP verification failed');
      }
    },
    onError: (error) => {
      const backendError =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        'OTP verification failed!';
      toast.error(backendError);
    },
  });

  const handlePhoneSubmit = () => {
    if (!phone.trim()) {
      toast.error('Please enter your phone number');
      return;
    }
    sendOtpMutation.mutate();
  };

  const handleOtpSubmit = () => {
    if (!otp.every((digit) => digit)) {
      toast.error('Please enter full OTP');
      return;
    }
    verifyOtpMutation.mutate();
  };

  const handleOtpChange = (index, value) => {
    if (/^\d?$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const isOtpComplete = otp.every((digit) => digit.length === 1);

  return (
    <div className="flex flex-col justify-center overflow-hidden items-center bg-zinc-950 min-h-screen pb-5 px-4">
      <div className="w-full max-w-[400px] pt-16">
        <h1 className="text-3xl text-white font-bold text-center mb-10">Sign In</h1>

        <div className="grid gap-4">
          {!otpSent && (
            <>
              <label className="text-white text-sm">Phone Number</label>
              <input
                type="tel"
                placeholder="93113302***"
                value={phone}
                maxLength={10}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none"
              />
              <button
                onClick={handlePhoneSubmit}
                disabled={sendOtpMutation.isPending}
                className="mt-2 w-full bg-white text-zinc-950 py-3 rounded-lg font-medium hover:bg-white/90 active:bg-white/80 transition"
              >
                {sendOtpMutation.isPending ? 'Sending...' : 'Send OTP'}
              </button>
            </>
          )}

          {otpSent && (
            <>
              <p className="text-white text-center">Enter 4-digit OTP</p>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className={`w-12 h-12 text-center text-white text-xl rounded-md border transition outline-none ${
                      isOtpComplete
                        ? 'border-green-500 bg-green-900'
                        : 'border-zinc-800 bg-zinc-900'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={handleOtpSubmit}
                disabled={verifyOtpMutation.isPending}
                className="mt-4 w-full bg-white text-zinc-950 py-3 rounded-lg font-medium hover:bg-white/90 active:bg-white/80 transition"
              >
                {verifyOtpMutation.isPending ? 'Verifying...' : 'Verify OTP'}
              </button>
            </>
          )}
        </div>

        <div className="relative my-6">
          <div className="flex items-center">
            <div className="flex-grow border-t border-zinc-800"></div>
            <span className="mx-3 text-xs text-zinc-500">or</span>
            <div className="flex-grow border-t border-zinc-800"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;