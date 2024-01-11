import {Link} from 'react-router-dom'
function HomePage() {
  return (
    <div className='text-center justify-center my-5'>
        <h1 className="text-4xl font-bold mb-5">Sistema de Hospital</h1>
        <div >
          <Link to="/login"><button className='bg-indigo-800 p-10 text-4xl font-bold rounded-md'>Login</button></Link>
        </div>
    </div>
  )
}

export default HomePage