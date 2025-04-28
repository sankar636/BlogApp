import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import Button from './Button.jsx'
import Input from './Input.jsx'
import Logo from './Logo.jsx'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import service from '../appwrite/config.js'
import { login } from '../store/authSlice.js'
import authService from '../appwrite/auth.js'

const SignUP = () => {
    const navigate = useNavigate()
    //Error Handel by state
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handelSubmit} = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData){
               const user = await authService.getCurrentUser()
                if(user){
                    dispatch(login({user}))
                    navigate('/')
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
                    <Logo/>
                </span>
            </div>
            <h2>Create Account</h2>
            <p>Already Have An Account?$nbsp:
                <Link
                to="/login"
                >
                    Sign In
                </Link>
            </p>
            {error && <p>{error}</p> }
            <form onSubmit={handelSubmit(create)}>
                <div>
                <Input
                    {...register("name", {required: true})}
                    label="Full Name: "
                    placeholder="Full Name"
                    />
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
                    <button type='submit'>
                        Create Account{" "}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SignUP