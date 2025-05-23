import { Link, useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import {Button} from './index.js'
import {InputBox} from './index.js'
import {Logo} from './index.js'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
// import service from '../appwrite/config.js'
import { login } from '../store/authSlice.js'
import authService from '../appwrite/auth.js'

const SignupComponent = () => {
    const navigate = useNavigate()
    //Error Handel by state
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit } = useForm() // it's not hadelSubmit(it is an error)

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData){
               const user = await authService.getCurrentUser()
               if (userData) dispatch(login({userData}))
                navigate('/')
            }
        } catch (error) {
            console.log("Error is: ",error);
            setError(error.message || "Something went wrong while creating Account")
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className="space-y-5">
                        <InputBox
                            {...register("name", { required: true })}
                            label="Full Name : "
                            placeholder="Full Name"
                        />
                        <InputBox
                            {...register("email", {
                                required: true,
                                
                            })}
                            label="Email : "
                            placeholder="Email Address"
                            type="email"
                        />
                        <InputBox
                            {...register("password", { required: true })}
                            label="Password : "
                            type="password"
                            placeholder="Password"
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignupComponent