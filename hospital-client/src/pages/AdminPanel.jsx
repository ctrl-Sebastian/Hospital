import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { getPatients } from '../api/patients'

function AdminPanel() {
    const [patients, setPatients] = useState([])
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
  return (
    <div>
        <Link to="/register">Register patient</Link>
        {
            patients.map((patient) => {
                return(
                    <div key={patient._id}>
                        <h1><Link to={`/users/${patient._id}`}>{patient.username}</Link></h1>
                    </div>
                )
            })
        }
    </div>
  )
}

export default AdminPanel