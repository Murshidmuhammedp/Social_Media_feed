import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DashboardLayoutBasic from '../components/Sidbar'
import SignIn from '../components/auth/SignIn'

export default function AppRoute() {
  return (
    <Routes>
            <Route path='/' element={<DashboardLayoutBasic />}  />
            <Route path='/signin' element={<SignIn />}  />

    </Routes>
  )
}
