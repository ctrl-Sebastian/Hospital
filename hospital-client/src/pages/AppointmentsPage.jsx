import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { getAppointmentsRequest, postAppointmentRequest } from "../api/user";

function AppointmentsPage() {
    const {user} = useAuth()
    const {register, handleSubmit} = useForm()
    const [appointments, setAppointments] = useState([]);

    useEffect(() => { 
        console.log(user);
      const getAllUserBills = async () => {
          try {
              const res = await getAppointmentsRequest()
              if (res.status === 200) {
                  setAppointments(res.data);
                  
              }
          } catch (error) {
              console.log(error);
          }
        }
        getAllUserBills()
      }, []);

      const postAppointment = async (appointment) =>{
        if(confirm('Are you sure?')){
          
          const resToPayBill = await postAppointmentRequest(appointment)
    
          if(resToPayBill.status === 200){
            console.log("appointment posted");
                location.reload()
          }
      }
      }

    const onSubmit = handleSubmit( async (values) => {
        values.user = user.id
        console.log(values);
        postAppointment(values);
      })

  return (
    <div className='flex items-center justify-center'>
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
    <h1 className='text-2xl font-bold text-cyan-200'>Agendar cita</h1>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="Doctor a cargo"
          
            {...register('doctor')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />

          <textarea rows="3" type="text" placeholder="Descripcion de la cita"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register('description')}
          />

          <input type="date" placeholder="Fecha"
            {...register('date')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <button type="submit" style={{fontWeight: 600, color: '#a5f3fc', backgroundColor: '#3f3f46', padding: 5, borderRadius: 5}}>Save</button>
        </form>
    </div>
    <div>
        {
            appointments.map((appointment) => {
                <div className='bg-zinc-500 max-w-md w-full p-10 rounded-md'>
                    {appointment.user}
                    {appointment.doctor}
                    {appointment.date}
                </div>
            })
        }
    </div>
  </div>
  )
}

export default AppointmentsPage