import React, {useState} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { login as authLogin } from '../store/authSlice';
import { useForm } from 'react-hook-form';
import { Input,Button } from './index';


function Login() {
  const [error,setError] = useState("")
  const {register,handleSubmit} = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data);
      if (session) {
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
    <div className='p-4 flex items-center justify-center w-full absolute top-0' style={{ height: "100%" }}>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            {/* <Logo width="100%" /> */}
          </span>
        </div>
        <h2 className="text-center text-xl md:text-2xl font-bold leading-tight">Sign in your Account</h2>
        <p className="text-sm md:text-lg mt-2 mb-2 text-center  text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link to='/signup' className="font-medium text-primary transition-all duration-200 hover:underline">
            Signup
          </Link>
        </p>
        {
          error && <p className='text-red-600 mt-8 text-center'>{error}</p>
        }
        <form onSubmit={handleSubmit(login)}>
        <div className="space-y-5">
          <Input
          label="Email"
          placeholder="Enter tor email"
          type="email"
          {...register('email',{
            required:true,
            validate: {
              matchPattern: (value)=> /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) ||
              "Email address must be valide address", 
            }
          })}
          />
          
          <Input
          label="Password"
          placeholder="Enter to your password"
          type="password"
          {...register('password',{
            required:true,
          })}
          />

          <Button className='w-full' type='submit'>Sign In</Button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default Login
