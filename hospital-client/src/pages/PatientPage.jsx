import { useState, useEffect } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { getPatientBills, getPatientById, deleteBillRequest } from '../api/admin'
import BillForm from './BillForm'
import UpdatePatientForm from '../components/UpdatePatientForm'

function PatientPage() {
  const [bills, setBills] = useState([])
  const [userId, setUserId] = useState("")

  const navigate = useNavigate()
  const params = useParams()

  useEffect(() => {
    setUserId(params.id)
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
      getAllUserBills()
    }, []);

    const deleteBill = async (id) => {
      if(confirm('Are you sure?')){
          const res = await deleteBillRequest(id)
          console.log(res);
          location.reload();
      }
  }

return (
  <div className='text-center'>
    <UpdatePatientForm />
    <BillForm userId={userId}/>
    <div className='flex flex-wrap items-center justify-center my-5'>
    <h1 className='text-2xl font-bold'>Todas las cuentas del paciente</h1>
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