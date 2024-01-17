import { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { getBills, payBillRequest, postTransactionsRequest } from '../api/user'

import { useAuth } from '../context/AuthContext'

function BillsPage() {
  const [bills, setBills] = useState([])
  const [dineroGenerado, setDineroGenerado] = useState(0)
  const {user} = useAuth()
  const navigate = useNavigate()

  useEffect(() => { 
    console.log(user);
  const getAllUserBills = async () => {
      try {
          const res = await getBills()
          if (res.status === 200) {
              setBills(res.data);
              
          }
      } catch (error) {
          console.log(error);
      }
    }
    getAllUserBills()
  }, []);

  const payBill = async (bill) =>{
    if(confirm('Are you sure?')){
      setDineroGenerado(dineroGenerado + bill.balance)
      bill.billStatus = "pagada"
      
      const resToPayBill = await payBillRequest(bill)

      if(resToPayBill.status === 200){

          const resToPostTransaction = await postTransactionsRequest({user: user._id, bill: bill._id})
          
          if(resToPostTransaction.status === 200){
              navigate('/bills')
        }

      }

  }
  }

  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold my-5">Caja</h1>
      <h1 className="text-3xl font-bold">- Cuentas pendientes -</h1>
      <div className='flex flex-wrap items-center justify-center my-5'>
      {
          bills.filter((bill) => bill.billStatus === "active").map((bill) => {
              return(
                  <div key={bill._id} className='bg-zinc-700 max-w-md w-full p-10 rounded-md my-2'>
                      <h1><Link to={`/bills/${bill._id}`}><strong>Descripcion: {bill.description}</strong></Link></h1>
                      <h2>Balance: RD${bill.balance}</h2>
                      <h2>Estado: {bill.billStatus}</h2>
                      <button onClick={() => payBill(bill)} className='bg-green-700 px-5 py-2 rounded-md mx-2 my-1'>Pagar</button>
                  </div>
              )
          })
      }
      </div>
      <h1 className="text-3xl font-bold">- Cuentas pagadas -</h1>
      <div className='flex flex-wrap items-center justify-center my-5'>
      {
          bills.filter((bill) => bill.billStatus !== "active").map((bill) => {
              return(
                  <div key={bill._id} className='bg-zinc-700 max-w-md w-full p-10 rounded-md my-2'>
                      <h1><Link to={`/bills/${bill._id}`}><strong>Descripcion: {bill.description}</strong></Link></h1>
                      <h2>Balance: RD${bill.balance}</h2>
                      <h2>Estado: {bill.billStatus}</h2>
                  </div>
              )
          })
      }
      </div>
    </div>
  )
}

export default BillsPage