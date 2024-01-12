import { useState, useEffect } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import { getPatientBills, getPatientById, deleteBillRequest } from '../api/admin'
import BillForm from './BillForm'
import UpdatePatientForm from '../components/UpdatePatientForm'

function PatientPage() {
  const [bills, setBills] = useState([])
  const [userId, setUserId] = useState("")
  const [user, setUser] = useState({})

  const navigate = useNavigate()
  const params = useParams()
  
  useEffect(() => {
    setUserId(params.id)
    const getThePatient = async () => {
      try {
          const res = await getPatientById(params.id)
          if (res.status === 200) {
              setUser(res.data);
          }
      } catch (error) {
          console.log(error);
      }
    }
    
    const getAllUserBills = async () => {
        try {
            const res = await getPatientBills(params.id)
            if (res.status === 200) {
                setBills(res.data);
            }
        } catch (error) {
            console.log(error);
        }
      }
      getThePatient()
      getAllUserBills()
    }, []);

    const deleteBill = async (id) => {
      if(confirm('Are you sure?')){
          const res = await deleteBillRequest(id)
          location.reload();
      }
  }

return (
  <div className='text-center'>
    <Accordion style={{backgroundColor: '#3F3F46'}} disableGutters>
      <AccordionSummary
        aria-controls="panel2-content"
        id="panel2-header"
        style={{color: '#b0d7f8', fontWeight: 700, fontSize: 24}}
      >
        <h1>Actualizar paciente</h1>
      </AccordionSummary>

      <AccordionDetails>
        <UpdatePatientForm user={user}/>
      </AccordionDetails>
    </Accordion>

    <Accordion style={{backgroundColor: '#3F3F46'}} defaultExpanded disableGutters>
      <AccordionSummary
        aria-controls="panel1-content"
        id="panel1-header"
        style={{color: '#b0d7f8', fontWeight: 700, fontSize: 24}}
      >
        <h1>Crear cuenta de paciente</h1>
      </AccordionSummary>

      <AccordionDetails>
        <BillForm userId={userId}/>
      </AccordionDetails>
    </Accordion>

    <h1 className='text-2xl mt-6 font-bold'>Todas las cuentas del paciente</h1>
    <div className='flex flex-wrap items-center justify-center my-5'>
      {
          bills.map((bill) => {
              return(
                  <div key={bill._id} className='bg-zinc-700 max-w-md w-full p-10 rounded-md my-2'>
                      <h1><Link to={`/bills/${bill._id}`}><strong>Descripcion: {bill.description}</strong></Link></h1>
                      <h2>Balance: RD${bill.balance}</h2>
                      <h2>Estado: {bill.billStatus}</h2>
                      <button onClick={() => navigate(`/bills/${bill._id}`)} className='bg-blue-700 p-5 rounded-md mx-2 my-1'>Update</button>
                      <button onClick={() => deleteBill(bill._id)} className='bg-red-700 p-5 rounded-md mx-2 my-1'>Delete</button>
                  </div>
              )
          })
      }
    </div>
  </div>
)
}

export default PatientPage