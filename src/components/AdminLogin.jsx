import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Velustro } from 'uvcanvas';
import axios from 'axios';
import  getBaseUrl  from '../utils/baseURL';







const AdminLogin = () => {
    const navigate = useNavigate();

    const [message, setMessage] = useState('');
const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const onSubmit =async (data) => {
    console.log(data)
    try {
        const response = await axios .post(`${getBaseUrl()}/api/auth/admin`,data,{
            headers: {
                'Content-Type': 'application/json',
            }
        })
         
        const auth = response.data;
        console.log(auth)
        if(auth.token){
            localStorage.setItem('token',auth.token);
            setTimeout(() => {
                localStorage.removeItem('token');
                alert('token has expired , Please Login again');
                navigate('/');
            },3600*1000);
        }
        alert('Admin Login Successfully')
         navigate('/dashboard')
      
    } catch (error) {
      setMessage("Please provide a valid email and password")
      console.error(error)
    }
  }





  return (
    <div className="relative h-screen w-full flex items-center justify-center">
    {/* Canvas Background */}
    <div className="absolute top-0 left-0 w-full h-full -z-10">
      <Velustro />
    </div>

    {/* Login Box */}
    <div className="relative z-20 w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 py-6 bg-white/80">
      <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input {...register("username", { required: true })}
            type="text"
            name="username"
            id="username"
            placeholder="Enter your Username"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input {...register("password", { required: true })}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your Password"
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}

        <div>
          <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
            Login
          </button>
        </div>
      </form>

      

      

      <p className="text-center text-sm mt-4 text-gray-500">©2025 Book Store. All rights reserved.</p>
    </div>
  </div>
  )
}

export default AdminLogin