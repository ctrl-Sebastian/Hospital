import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { updateBillRequest, getBillByIdRequest } from "../api/admin"

import {useParams} from 'react-router-dom'

function UpdateBillForm() {
    const [bill, setBill] = useState({});
    const {register, handleSubmit} = useForm()
    const params = useParams()

    useEffect(() => {
      const getTheBill = async () => {
        try {
            const res = await getBillByIdRequest(params.id)
            if (res.status === 200) {
                setBill(res.data)
                console.log(res.data);
            }
        } catch (error) {
            console.log(error);
        }
      }
      getTheBill()
    }, []);

    const updateBill = async (bill) => {
        try {
            const res = await updateBillRequest(bill)
            if (res.status === 200) {
              console.log("bill created");
            }
        } catch (error) {
          console.log(error);
        }
    }
    
      const onSubmit = handleSubmit( async (values) => {
        values._id = params.id
        values.balance = parseInt(values.balance)
        const billToSend = values
        if(billToSend.billStatus === "") delete billToSend.billStatus
        if(billToSend.description === "") delete billToSend.description
        updateBill(billToSend)
      })

    return (
    <div className='flex items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <h1>Actualizar cuenta</h1>
        
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="monto"
              {...register('balance')}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              autoFocus
              defaultValue={bill.balance}
              
            />
            <input type="text" placeholder="estado"
              {...register('billStatus')}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              defaultValue={bill.billStatus}
            />
            <textarea rows="3" type="text" placeholder="descripcion"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              {...register('description')}
              defaultValue={bill.description}
            />
            <button type="submit" style={{fontWeight: 600, color: '#a5f3fc', backgroundColor: '#3f3f46', padding: 5, borderRadius: 5}}>Actualizar</button>
          </form>
      </div>
    </div>
    )
}

export default UpdateBillForm
