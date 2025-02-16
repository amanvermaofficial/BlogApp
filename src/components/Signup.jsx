import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Input, Button } from './index';
import { login as authLogin } from '../store/authSlice';

function Signup() {
    const [error, setError] = useState("")
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data);
            if (userData) {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    dispatch(authLogin({ userData }))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className='p-4 flex  justify-center w-full items-center absolute top-0' style={{ height: "100%" }}>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-4 md:p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        {/* <Logo width="100%" /> */}
                    </span>
                </div>
                <h2 className="text-center text-xl md:text-2xl font-bold leading-tight">Sign Up your Account</h2>
                <p className="text-sm md:text-lg my-2 text-center text-black/60">
                    Already have an account?&nbsp;
                    <Link to='/login' className="font-medium text-primary transition-all duration-200 hover:underline">
                        Signin
                    </Link>
                </p>
                {
                    error && <p className='text-red-600 mt-8 text-center'>{error}</p>
                }
                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                            label="Name"
                            placeholder="Enter your name"
                            type="text"
                            {...register('name', {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
                                        "Email address must be valide address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter to your password"
                            type="password"
                            {...register('password', {
                                required: true,
                            })}
                        />

                        <Button className='w-full' type='submit'>Sign Up</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup
