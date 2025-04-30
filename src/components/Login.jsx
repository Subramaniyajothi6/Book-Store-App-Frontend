import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";

import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [message, setMessage] = useState('');
  const {loginUser,signInWithGoogle} = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onSubmit =async (data) => {
    try {
      await loginUser(data.email,data.password)
      alert('Login Successfully')
      navigate('/')
      
    } catch (error) {
      setMessage("Please provide a valid email and password")
      console.error(error)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      alert("Login successful!");
      navigate("/")
    } catch (error) {
      alert("Google sign in failed!")
      console.error(error)      
    }
   }

  return (
    <div className="relative h-screen w-full flex items-center justify-center">
 

      {/* Login Box */}
      <div className="relative z-20 w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 py-6 bg-white/80">
        <h2 className="text-2xl font-semibold mb-4">Please Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
              Login
            </button>
          </div>
        </form>

        <p className="text-sm mt-4">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link>
        </p>

        <div className="mt-5">
          <button onClick={handleGoogleLogin}
            className="w-full flex justify-center items-center gap-3 bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
            <FaGoogle />
            Sign in with Google
          </button>
        </div>

        <p className="text-center text-sm mt-4 text-gray-500">©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;