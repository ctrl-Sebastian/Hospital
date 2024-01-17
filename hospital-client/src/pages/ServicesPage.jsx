import React, {useEffect, useState} from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { getServicesRequest, postServiceRequest } from '../api/user';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ServicesPage() {
    const {user} = useAuth()
    const {register, handleSubmit} = useForm()

    const [serviceToRequest, setServiceToRequest] = useState('');
    const [requestedServices, setRequestedServices] = useState([]);

    const handleChange = (event) => {
      setServiceToRequest(event.target.value.toString());
    };

    useEffect(() => { 
      console.log(user);
    const getAllRequestedServices = async () => {
        try {
            const res = await getServicesRequest()
            if (res.status === 200) {
              setRequestedServices(res.data);
                
            }
        } catch (error) {
            console.log(error);
        }
      }
      getAllRequestedServices()
    }, []);

    const postService = async (serviceBeignRequested) =>{
      if(confirm('Are you sure?')){
        
        const resToPostServiceRequest = await postServiceRequest(serviceBeignRequested)
  
        if(resToPostServiceRequest.status === 200){
          console.log("service requested");
            
        }
    }
    }

  const onSubmit = handleSubmit( async (values) => {
      values.user = user.id
      values.service = serviceToRequest
      console.log(values)
      postService(values);
    })

  return (
    <div className='flex flex-wrap items-center justify-center my-5'>
      <div className='bg-zinc-800 max-w-full p-10 rounded-md max-w-md w-full text-center'>
        <div>
          <h1 className='text-2xl font-bold text-cyan-200 mb-5'>Solicitar Servicio</h1>
          <form onSubmit={onSubmit}>
          <FormControl fullWidth >
              <InputLabel id="demo-simple-select-label" style={{color: '#b0d7f8', outlineColor: '#b0d7f8'}}>Servicio a solicitar</InputLabel>
              <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={serviceToRequest}
              label="Servicio"
              onChange={handleChange}
              style={{color: '#b0d7f8', outlineColor: '#b0d7f8'}}
              >
              <MenuItem value={"Prueba de Covid-19"}>Prueba de Covid-19</MenuItem>
              <MenuItem value={"Chequeo medico"}>Chequeo Medico</MenuItem>
              <MenuItem value={"Diagnostico por imagenes medicas"}>Diagnostico por imagenes medicas</MenuItem>
              </Select>
          </FormControl>
            <input type="date" placeholder="Fecha"
              {...register('date')}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            />
            <button type="submit" style={{fontWeight: 600, color: '#a5f3fc', backgroundColor: '#3f3f46', padding: 5, borderRadius: 5}}>Save</button>
          </form>

        </div>
      </div>
      <div>
        {
                requestedServices.map((service, i) => {
                  return(
                    <div key={service._id} className='bg-zinc-700 max-w-md w-full p-10 my-7 rounded-md'>
                      <h1 className="text-2xl">Service #{i+1}</h1>
                      <h1><strong>Servicio solicitado: </strong>{service.service}</h1>
                      <h2><strong>Fecha: </strong>{service.date}</h2>
                        
                    </div>
                  )  
              })
                
            }
      </div>
  </div>
  )
}

export default ServicesPage