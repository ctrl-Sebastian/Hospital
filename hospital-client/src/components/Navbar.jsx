import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth()
  return (
    <nav className="bg-zinc-700 flex justify-between py-5 px-10">
        <Link to="/">
            <h1 className="text-2xl font-bold">Sistema Hospital</h1>
        </Link>
        <ul className="flex gap-x-2">

            {
                isAuthenticated ? (
                    <>
                        <li>Welcome! {user.username}</li> |
                        <li><Link to="/bills" className="bg-green-500 font-bold px-4 py-1 rounded-sm">Cuentas</Link></li> |
                        <li><Link to="/" onClick={() => {logout();}} className="bg-indigo-500 px-4 py-1 rounded-sm">Logout</Link></li> |
                    </>
                ) : (
                    <>
                        <li><Link to="/admin-panel" className="bg-red-500 px-4 py-1 rounded-sm text-black">Admin</Link></li> |
                        <li><Link to="login" className="bg-indigo-500 px-4 py-1 rounded-sm">Usuario</Link></li> |
                    </>
                )
            }

        </ul>
    </nav>
  )
}

export default Navbar