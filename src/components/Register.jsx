import React, { useState } from 'react'
import { Link, useNavigate,  } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { useAuth } from '../context/AuthContext';
import { Velustro } from 'uvcanvas';



const Register = () => {
    const [message, setMessage] = useState("");
    const {registerUser, signInWithGoogle} = useAuth();
    const navigate = useNavigate();


    // console.log(registerUser)
    const {
        register,
        handleSubmit,
        watch,
        formState: { error },
      } = useForm()
  
    //   register user

      const onSubmit = async(data) => {
        // console.log(data)
        try {
            await registerUser({email:data.email,password:data.password});
            alert("User registered successfully!")
        } catch (error) {
           setMessage("Please provide a valid email and password") 
           console.error(error)
        }
      }

      const handleGoogleSignIn = async() => {
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
    <div className="absolute top-0 left-0 w-full h-full -z-10">
            <Velustro />
          </div>
    <div className='h-[calc(100vh-120px)] flex justify-center items-center  '>          
    <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 '>
 
        <h2 className='text-xl font-semibold mb-4'>Please Register</h2> 
        

        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                <input 
                {...register("email", { required: true })} 
                type="email" name="email" id="email" placeholder='Email Address'
                className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                />
            </div>
            <div className='mb-4'>
                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                <input 
                {...register("password", { required: true })} 
                type="password" name="password" id="password" placeholder='Password'
                className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                />
            </div>
            {
                message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
            }
            <div>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Register</button>
            </div>
        </form>
        <p className='align-baseline font-medium mt-4 text-sm'>Have an account? Please <Link to="/login" className='text-blue-500 hover:text-blue-700'>Login</Link></p>

        {/* google sign in */}
        <div className='mt-4'>
            <button 
            onClick={handleGoogleSignIn}
            className='w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none'>
            <FaGoogle  className='mr-2'/>
            Sign in with Google
            </button>
        </div>

        <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
    </div>
</div>
</div>

// {/* <div className="relative h-screen w-full flex items-center justify-center">
//       {/* Canvas Background */}
//       <div className="absolute top-0 left-0 w-full h-full -z-10">
//         <Velustro />
//       </div>

//       {/* Login Box */}
//       <div className="relative z-20 w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 py-6 bg-white/80">
//         <h2 className="text-2xl font-semibold mb-4">Please Register</h2>

//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//               Email
//             </label>
//             <input {...register("email", { required: true })}
//               type="email"
//               name="email"
//               id="email"
//               placeholder="Enter your email"
//               className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//               Password
//             </label>
//             <input {...register("password", { required: true })}
//               type="password"
//               name="password"
//               id="password"
//               placeholder="Enter your Password"
//               className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
//             />
//           </div>

//           {message && <p className="text-red-500 text-xs italic mb-3">{message}</p>}

//           <div>
//             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
//               Sign Up
//             </button>
//           </div>
//         </form>

//         <p className="text-sm mt-4">
//           Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
//         </p>

//         <div className="mt-5">
//           <button onClick={handleGoogleSignIn}
//             className="w-full flex justify-center items-center gap-3 bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
//             <FaGoogle />
//             Sign Up with Google
//           </button>
//         </div>

//         <p className="text-center text-sm mt-4 text-gray-500">©2025 Book Store. All rights reserved.</p>
//       </div>
//     </div> */}


  )
}

export default Register