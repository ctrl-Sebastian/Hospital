import { useForm } from "react-hook-form"
import { postBill } from "../api/patients";

function BillForm(props) {
  const {register, handleSubmit} = useForm()

  const addBill = async (bill) => {
    try {
        const res = await postBill(bill)
        if (res.status === 200) {
          console.log("bill created");
        }
    } catch (error) {
      console.log(error);
    }
}

  const onSubmit = handleSubmit( async (values) => {
    values.user = props.userId
    values.monto = parseInt(values.monto)
    console.log(values);
    addBill(values)
  })

  return (
    <div className='flex items-center justify-center'>
      <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
        <h1>Create a bill</h1>
        
          <form onSubmit={onSubmit}>
            <input type="text" placeholder="monto"
              {...register('monto')}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              autoFocus
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

export default BillForm