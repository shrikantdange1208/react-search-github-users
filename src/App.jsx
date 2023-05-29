import { useState } from 'react'
import { Dashboard, Login, Error, AuthWrapper } from './pages'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PrivateRoute from './pages/PrivateRoute'
function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthWrapper>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AuthWrapper>
  )
}

export default App
