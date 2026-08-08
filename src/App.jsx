import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './Routes/AppRoutes'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
       <Toaster
        position="top-right"
        richColors
        closeButton
        duration={3000}
      />
    </BrowserRouter>
  )
}

export default App