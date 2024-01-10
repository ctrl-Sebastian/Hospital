import { useForm } from "react-hook-form"

function BillFormPage() {
  const {register, handleSubmit} = useForm()

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  })

  return (
    <div>
        <h1 className="text-4xl font-bold">Add or update bill</h1>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="monto"
            {...register('monto')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
            autoFocus
          />
          <textarea rows="3" type="text" placeholder="descripcion"
            {...register('description')}
          />
          <button>Save</button>
        </form>
    </div>
  )
}

export default BillFormPage