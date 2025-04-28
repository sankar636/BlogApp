import authService from '../appwrite/auth.js'
import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Button from './Button.jsx'
import Input from './Input.jsx'
import Logo from './Logo.jsx'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import service from '../appwrite/config.js'
import { login as authLogin } from '../store/authSlice.js'

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
           const session = await authService.login(data)
           if(session){
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
    <div className='flex items-center justify-center'>
        <div>
            <div>
                <span>
                    <Logo width="100%"/>
                </span>
            </div>
            <h2>Sign In to your account</h2>
            <p>Don&apos;t have any Accoumt?&nbsp;
                <Link
                to="/signup"
                >
                    Sign Up
                </Link>
            </p>
            {error && <p>{error}</p> }
            <form onSubmit={handleSubmit(login)}>
                <div>
                    <Input
                    {...register("email", {required: true})}
                    label="Email"
                    placeholder="Email Address"
                    type="email"
                    />
                    <Input
                    {...register("password", {required: true})}
                    label="Password : "
                    placeholder="Password"
                    type="password"
                    />
                    <Button type='submit'>
                        Sign In
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login