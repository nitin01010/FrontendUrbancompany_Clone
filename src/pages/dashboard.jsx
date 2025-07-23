import React from 'react'
import UserMonthlyCharts from '../components/userMonthlyChats'

const Dashboard = ({ userName, userNumber }) => {
  
  return (
    <div className="w-full md:w-[78%] mx-auto h-screen p-3  py-6 mb-10">
      <h1 className="text-3xl font-bold underline underline-offset-4 decoration-blue-500 py-4">
        <span className="uppercase">Welcome</span>
        <span className="capitalize ml-2">{userName === '' ? userNumber : userName}</span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-5 flex items-center justify-center rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
          <p className="text-xl font-semibold">🛒 Placed Orders : <span className="font-bold">2</span></p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-5 flex items-center justify-center rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
          <p className="text-xl font-semibold">⏳  Orders in Progress : <span className="font-bold">2</span></p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-5 flex items-center justify-center rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
          <p className="text-xl font-semibold">✅ Shipped Orders : <span className="font-bold">2</span></p>
        </div>
      </div>
      <UserMonthlyCharts />
    </div>

  )
}

export default Dashboard
