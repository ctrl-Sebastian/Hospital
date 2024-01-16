import { Link } from "react-router-dom"

function UserPanel() {
  return (
    <div className='flex flex-wrap items-center justify-center my-5'>
        <div className='max-w-md w-full text-center'>
            <div className='bg-green-700 max-w-md w-full p-10 rounded-md my-5'>
                <Link to={`/bills`} >
                    <div className="bg-green-800 px-4 py-1 rounded-md">
                        <h1 className="text-4xl font-bold">Cuentas</h1>
                    </div>
                </Link>
            </div>
            <div className='bg-blue-700 max-w-md w-full p-10 rounded-md my-5'>
                <Link to={`/appointments`} >
                    <div className="bg-blue-800 px-4 py-1 rounded-md">
                        <h1 className="text-4xl font-bold">Agendar cita</h1>
                    </div>
                </Link>
            </div>
            <div className='bg-orange-700 max-w-md w-full p-10 rounded-md my-5'>
                <Link to={`/services`} >
                    <div className="bg-orange-800 px-4 py-1 rounded-md">
                        <h1 className="text-4xl font-bold">Solicitar Servicios</h1>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default UserPanel