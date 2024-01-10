import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { getUserBills } from '../api/patients'

function PatientPage() {
  const [bills, setBills] = useState([])
  useEffect(() => {
      const getAllUserBills = async () => {
          try {
              const res = await getUserBills("659dedf65b8706032be5611b")
              if (res.status === 200) {
                  setBills(res.data);
              }
          } catch (error) {
              console.log(error);
          }
      }
      getAllUserBills()
  }, []);
return (
  <div>
    <Link to="">Add bill</Link>
      {
          bills.map((bill) => {
              return(
                  <div key={bill._id} className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
                      <h1><Link to={`/bills/${bill._id}`}>Descripcion: {bill.description}</Link></h1>
                      <h2>Balance: {bill.balance}</h2>
                  </div>
              )
          })
      }
  </div>
)
}

export default PatientPage