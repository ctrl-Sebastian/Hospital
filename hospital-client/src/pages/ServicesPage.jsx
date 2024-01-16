import React from 'react'
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ServicesPage() {
    const {user} = useAuth()
    const {register, handleSubmit} = useForm()

    const [serviceToRequest, setServiceToRequest] = React.useState('');

    const handleChange = (event) => {
      setServiceToRequest(event.target.value.toString());
    };

    const onSubmit = handleSubmit( async (values) => {
        values.user = user.id
        values.service = serviceToRequest
        console.log(values);
      })

  return (
    <div className='flex items-center justify-center'>
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
    <h1 className='text-2xl font-bold text-cyan-200'>Agendar cita</h1>
      
        <form onSubmit={onSubmit}>
        <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">Servicio a solicitar</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={serviceToRequest}
            label="Servicio"
            onChange={handleChange}
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
  )
}

export default ServicesPage