import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { updatePatientRequest } from '../api/admin'

function UpdatePatientForm({user}) {

    const {
        register, 
        handleSubmit, 
        formState: { errors },
    } = useForm()
    const {errors: registerErrors } = useAuth()

    const onSubmit = handleSubmit( async (values) => {
        values._id = user._id
        const userToSend = values
        if(userToSend.cedula === "") delete userToSend.cedula
        if(userToSend.username === "") delete userToSend.username
        if(userToSend.email === "") delete userToSend.email
        console.log(userToSend);
        updatePatientRequest(userToSend)
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
            defaultValue={user.cedula}
        />
        
        {errors.cedula && (<p className='text-red-500'>Cedula is required</p>)}
        
        <input type="text" {...register("username")}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='username'
            defaultValue={user.username}
        />

        {errors.username && (<p className='text-red-500'>Username is required</p>)}

        
        <input type="email" {...register("email")}
            className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            placeholder='email'
            defaultValue={user.email}
        />

        {errors.email && (<p className='text-red-500'>Email is required</p>)}

        <button type='submit' style={{fontWeight: 600, color: '#a5f3fc', backgroundColor: '#3f3f46', padding: 5, borderRadius: 5}}>Actualizar</button>
    </form>
    </div>
</div>
  )
}

export default UpdatePatientForm