import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import useAuth from '../userstore/useAuth';
import { useNavigate } from 'react-router-dom';
const Login = () => {
   const {login} = useAuth();
    const Navigate=useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
      });
    
      const [showPassword, setShowPassword] = useState(false);
    
      const handleSubmit=async(e)=>{
        e.preventDefault();
        const res=await login(form);
        if(res==="Login successful"){
          Navigate('/shorter')
        }
      }
  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
        
         {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={(e)=>{setForm({...form,email:e.target.value})}}
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={(e)=>{setForm({...form,password:e.target.value})}}
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-500 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
         No account?{" "}
          <Link to="/"className="text-indigo-600 cursor-pointer hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login