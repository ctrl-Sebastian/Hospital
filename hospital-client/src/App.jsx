import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import UpdateBillForm from './components/UpdateBillForm'
import PatientPage from './pages/PatientPage'
import AdminPanel from './pages/AdminPanel'
import ProtectedRoute from './ProtectedRoute'

import UserPanel from './pages/UserPanel'
import BillsPage from './pages/BillsPage'
import AppointmentsPage from './pages/AppointmentsPage'
import ServicesPage from './pages/ServicesPage'

import Navbar from './components/Navbar'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/admin-panel' element={<AdminPanel />}/>
          <Route path='/users/:id' element={<PatientPage/>}/>
            
          <Route path='/bills/:id' element={<UpdateBillForm />}/>
          
          <Route element={<ProtectedRoute />}>

            <Route path='/user-panel' element={<UserPanel />}/>
            <Route path='/bills' element={<BillsPage />}/>
            <Route path='/appointments' element={<AppointmentsPage />}/>
            <Route path='/services' element={<ServicesPage />}/>
          </Route>
        </Routes>
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="footer-col">
                <h4>company</h4>
                <ul>
                  <li><a href="#">about us</a></li>
                  <li><a href="#">our services</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>get help</h4>
                <ul>
                  <li><a href="#">hospital@gmail.com</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>follow us</h4>
                <div className="social-links">
                  <a href="#">Fb</a>
                  <a href="#">Ig</a>
                  <a href="#">X</a>
                  <a href="#">Tktk</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
