import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { getUserBills } from '../api/patients'
import BillForm from './BillForm'

function PatientPage() {
  const [bills, setBills] = useState([])
  const [userId, setUserId] = useState("")

  useEffect(() => {
    var currentUrl = window.location.href;
    var lastIndex = currentUrl.lastIndexOf('/');
    var userId = currentUrl.substring(lastIndex + 1);
    setUserId(userId)
      const getAllUserBills = async () => {
          try {
              const res = await getUserBills(userId)
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
        <BillForm userId={userId}/>
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