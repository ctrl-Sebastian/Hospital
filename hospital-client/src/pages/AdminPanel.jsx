import { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { getPatients, deletePatient, getTransactionsRequest } from '../api/admin.js'

function AdminPanel() {
    const [patients, setPatients] = useState([])
    const [transactions, setTransactions] = useState([])
    var totalGenerado = 0
    let totalGeneradoToShow = 0

    const [view, setView] = useState("pacients");
    const navigate = useNavigate()
    
    useEffect(() => {
        const getAllPatients = async () => {
            try {
                const res = await getPatients()
                if (res.status === 200) {
                    
                    setPatients(res.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        const getAllTransactions = async () => {
            try {
                const res = await getTransactionsRequest()
                if (res.status === 200) {
                    const today = new Date()
                    const todaysTransactions = res.data.filter(t => t.createdAt.substring(0, 10) === today.toISOString().substring(0, 10))
                    setTransactions(todaysTransactions);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getAllTransactions()
        getAllPatients()
    }, []);

    for (let i = 0; i < transactions.length; i++) {
        totalGenerado += transactions[i].bill.balance
    }
    totalGeneradoToShow = totalGenerado

    const deleteUser = async (id) => {
        if(confirm('Are you sure?')){
            const res = await deletePatient(id)
            location.reload();
        }
    }

    const hacerCuadre = () => {
        if(confirm('Hacer cuadre?')){
            
            console.log("Total generado en el dia: ", totalGenerado);
            totalGeneradoToShow = 0;
        }
    }

  return (
    <div className='flex flex-wrap items-center justify-center my-5'>
        <div className='max-w-md w-full text-center'>
        <button onClick={() => setView("pacients")} className="bg-zinc-500 font-bold px-4 mx-3 py-1 rounded-sm">Pacients</button>

        <button onClick={() => setView("caja")} className="bg-zinc-500 font-bold mx-3 px-4 py-1 rounded-sm">Caja</button>

        {
            (view === "pacients") ? (
                <section>
                <h1 className='text-4xl my-3 '>Todos los pacientes: </h1>
                <Link to="/register" className="bg-green-800 font-bold px-4 py-1 rounded-sm">Registrar paciente</Link>
                {
                    patients.map((patient) => {
                        return(
                            <div key={patient._id} className='bg-zinc-700 max-w-md w-full p-10 rounded-md my-2'>
                                <Link to={`/users/${patient._id}`} >
                                    <div className="bg-zinc-500 px-4 py-1 rounded-md">
                                        <h1><strong>Cedula:</strong> {patient.cedula}</h1>
                                        <h1><strong>Username:</strong> {patient.username}</h1>
                                        <h2><strong>Email:</strong> {patient.email}</h2>
                                    </div>
                                </Link>
                                <button onClick={() => navigate(`/users/${patient._id}`)} className='bg-blue-700 p-5 rounded-md mx-2 my-1'>Update</button>
                                <button onClick={() => deleteUser(patient._id)} className='bg-red-700 p-5 rounded-md mx-2 my-1'>Delete</button>
                            </div>
                        )
                    })
                }
                </section>
            ) : (
                <section>
                
                <h1 className='text-4xl mt-5'>Caja: </h1>
                <h2>Total generado hoy: RD${totalGeneradoToShow}</h2>
                <button onClick={() => hacerCuadre()} className='bg-green-700 px-5 py-2 rounded-md mx-2 my-5'>Hacer cuadre</button>
                <h1 className='text-4xl'>Todas las transacciones: </h1>
                {
                    transactions.map((transaction) => {
                        return(
                            <div key={transaction._id} className='bg-zinc-800 max-w-md w-full p-10 rounded-md my-2'>
                                <section className='bg-zinc-700 max-w-md w-full p-10 rounded-md my-2'>
                                    <h1>Paciente: {transaction.user.username}</h1>
                                    <h1>cedula: {transaction.user.cedula}</h1>
                                    <h1>email: {transaction.user.email}</h1>
                                </section>

                                <section className='bg-zinc-700 max-w-md w-full p-10 rounded-md my-2'>
                                    <h1>Cuenta pagada: {transaction.bill.description}</h1>
                                    <h1>Monto: {transaction.bill.balance}</h1>
                                </section>

                                <h1>Fecha de la transaccion: {transaction.bill.createdAt}</h1>
                            </div>
                        )
                    })
                }
            </section>
            )
        }

        </div>
    </div>
  )
}

export default AdminPanel