import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { updatePatientRequest } from '../api/admin'

function UpdatePatientForm() {
    const params = useParams()
    const {
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm()
    const {errors: registerErrors } = useAuth()

    const onSubmit = handleSubmit( async (values) => {
        values._id = params.id
        console.log(values);
        updatePatientRequest(values)
    });

  return (
    <div className='flex mb-5 items-center justify-center'>
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
    {
        registerErrors.map((error, i) => (
            <div key={i} className='bg-red-500 p-2 text-white  text-center my-2'>
                {error}
            </div>
        ))
    }
    <form onSubmit={onSubmit}>
        <h1 className='text-2xl font-bold text-cyan-200'>Actualizar Paciente</h1>
        <input type="text" {...register("cedula")}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='cedula'
        />
        
        {errors.cedula && (<p className='text-red-500'>Cedula is required</p>)}
        
        <input type="text" {...register("username")}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='username'
        />

        {errors.username && (<p className='text-red-500'>Username is required</p>)}

        
        <input type="email" {...register("email")}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='email'
        />

        {errors.email && (<p className='text-red-500'>Email is required</p>)}


        <input type="password" {...register("password")}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='password'
        />
        {errors.password && (<p className='text-red-500'>Password is required</p>)}

        <button type='submit'>Actualizar</button>
    </form>
    </div>
</div>
  )
}

export default UpdatePatientForm