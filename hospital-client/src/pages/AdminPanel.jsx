import { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { getPatients, deletePatient } from '../api/admin.js'

function AdminPanel() {
    const [patients, setPatients] = useState([])
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
        getAllPatients()
    }, []);

    const deleteUser = async (id) => {
        if(confirm('Are you sure?')){
            const res = await deletePatient(id)
            console.log(res);
            location.reload();
        }
    }

  return (
    <div className='flex flex-wrap items-center justify-center my-5'>
        <div className='max-w-md w-full text-center'>
            <h1 className='text-4xl'>All Users</h1>
            <Link to="/register" className="bg-green-500 font-bold px-4 py-1 rounded-sm">Register patient</Link>
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
        </div>
    </div>
  )
}

export default AdminPanel