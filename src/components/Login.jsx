import authService from '../appwrite/auth.js'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import { Button } from './index.js'
import { InputBox } from './index.js'
import { Logo } from './index.js'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice.js'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) {
          dispatch(authLogin(userData))
          navigate("/")
        }
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl p-8">
        <div className="flex justify-center mb-6">
          <Logo width="120px" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Sign In to Your Account</h2>
        <p className="text-center text-gray-600 text-sm mb-6">
          Don’t have an account?&nbsp;
          <Link to="/signup" className="text-blue-600 hover:underline font-medium">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="space-y-4">
          <InputBox
            {...register("email", { required: true })}
            label="Email"
            placeholder="Email Address"
            type="email"
          />
          <InputBox
            {...register("password", { required: true })}
            label="Password"
            placeholder="Password"
            type="password"
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200">
            Sign In
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
