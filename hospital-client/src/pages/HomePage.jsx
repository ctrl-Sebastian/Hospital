import {Link} from 'react-router-dom'
function HomePage() {
  return (
    <div>
        <h1 className="text-4xl font-bold">Sistema de Hospital</h1>
        <Link to="/login">User</Link>
        <Link to="/admin-panel">Admin</Link>
    </div>
  )
}

export default HomePage