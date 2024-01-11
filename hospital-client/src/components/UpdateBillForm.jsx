import { useForm } from "react-hook-form"
import { updateBillRequest } from "../api/admin"

import {useParams} from 'react-router-dom'

function UpdateBillForm() {
    const params = useParams()
    const {register, handleSubmit} = useForm()
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
        console.log(values);
        updateBill(values)
      })

    return (
    <div className='flex items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <h1>Update Bill</h1>
        
          <form onSubmit={onSubmit}>
            <input type="number" placeholder="monto"
              {...register('balance')}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              autoFocus
            />
            <input type="text" placeholder="estado"
              {...register('billStatus')}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            />
            <textarea rows="3" type="text" placeholder="descripcion"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              {...register('description')}
            />
            <button type="submit">Save</button>
          </form>
      </div>
    </div>
    )
}

export default UpdateBillForm
