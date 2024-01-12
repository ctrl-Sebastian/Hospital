import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'


function RegisterPage() {
    const {
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm()
    const {signUp, isAuthenticated, errors: registerErrors } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated) navigate("/bills")
    }, [isAuthenticated])

    const onSubmit = handleSubmit( async (values) => {
        signUp(values)
    });

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        {
            registerErrors.map((error, i) => (
                <div key={i} className='bg-red-500 p-2 text-white  text-center my-2'>
                    {error}
                </div>
            ))
        }
        <form onSubmit={onSubmit}>
            <h1 className='text-2xl font-bold'>Register</h1>
            <input type="text" {...register("cedula", {required: true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='cedula'
            />
            
            {errors.cedula && (<p className='text-red-500'>Cedula is required</p>)}
            
            <input type="text" {...register("username", {required: true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='username'
            />

            {errors.username && (<p className='text-red-500'>Username is required</p>)}

            
            <input type="email" {...register("email", {required: true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='email'
            />

            {errors.email && (<p className='text-red-500'>Email is required</p>)}


            <input type="password" {...register("password", {required: true})}
                className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                placeholder='password'
            />
            {errors.password && (<p className='text-red-500'>Password is required</p>)}

            <button type='submit' style={{fontWeight: 600, color: '#a5f3fc', backgroundColor: '#3f3f46', padding: 5, borderRadius: 5}}>Register</button>
        </form>
        </div>
    </div>
  )
}

export default RegisterPage