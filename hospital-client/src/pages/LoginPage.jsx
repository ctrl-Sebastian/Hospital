import { useEffect } from "react";
import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const {
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm()

  const {signIn, errors: signInErrors, isAuthenticated} = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    signIn(data);
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/bills");
    }
  }, [isAuthenticated]);

  return (
    <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        {
            signInErrors.map((error, i) => (
                <div key={i} className='bg-red-500 p-2 text-white text-center my-2'>
                    {error}
                </div>
            ))
        }
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-2xl font-bold'>Login</h1>
          <input type="text" {...register("cedula", {required: true})}
              className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
              placeholder='cedula'
          />
          
          {errors.cedula && (<p className='text-red-500'>Cedula is required</p>)}

          <input type="password" {...register("password", {required: true})}
              className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
              placeholder='password'
          />
          {errors.password && (<p className='text-red-500'>Password is required</p>)}

          <button type='submit'>Log In</button>
        </form>     
      </div>
    </div>
  )
}

export default LoginPage