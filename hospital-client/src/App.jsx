import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import BillsPage from './pages/BillsPage'
import BillFormPage from './pages/BillFormPage'
import PatientPage from './pages/PatientPage'
import AdminPanel from './pages/AdminPanel'
import ProtectedRoute from './ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/register' element={<RegisterPage />}/>
        <Route path='/admin-panel' element={<AdminPanel />}/>
        <Route path='/user/:id' element={<PatientPage/>}/>
        
        <Route element={<ProtectedRoute />}>

          <Route path='/bills' element={<BillsPage />}/>
          <Route path='/add-bill' element={<BillFormPage />}/>
          <Route path='/bill/:id' element={<BillFormPage />}/>
        </Route>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
