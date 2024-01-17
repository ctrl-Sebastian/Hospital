import React from 'react'
import {Link} from 'react-router-dom'
function HomePage() {
  return (
    <div className='flex text-center justify-center'>
       <div
        className='p-5 text-center bg-image'
        style={{ 
          backgroundImage: "url('https://th.bing.com/th/id/R.8ecfe6fbeefe159a1608daed440fa443?rik=AwJqErvdJFwayg&riu=http%3a%2f%2fyesofcorsa.com%2fwp-content%2fuploads%2f2017%2f05%2fHospital-Wallpaper-HQ.jpg&ehk=qi5s3Ock1OQupE3u%2fxIkXt6CFLugU8PZCVlzj1vr8CI%3d&risl=&pid=ImgRaw&r=0')", 
          width: '100%',
          height: 720,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPositionY: -100

       }}
      >
        <div className='mask' style={{ }}>
          <div className='d-flex justify-content-center align-items-center h-100'>
              <h1 className='mb-3 text-5xl font-bold text-cyan-800'>Sistema de Hospital</h1>
              <h4 className='mb-3'></h4>
              <a className='btn btn-outline-light btn-lg' href='#!' role='button'>
                <Link to="/login"><button className='bg-indigo-800 p-10 text-4xl font-bold rounded-md'>Login</button></Link>
              </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage