import { Routes, Route, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import Login from './Login'
import Register from './Register'
import ProtectedRoute from './ProtectedRoute'
import { useState, useEffect } from 'react'
import { checkToken } from '../utils/auth'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('jwt')

    if (token) {
      checkToken(token)
        .then(data => {
          setIsLoggedIn(true)
          setUserEmail(data.email)
          localStorage.setItem('userEmail', data.email)
          navigate('/', { replace: true })
        })
        .catch(err => {
          console.error('Erro ao verificar token:', err)
          handleLogout()
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      setIsLoading(false)
    }
  }, [])

  function handleLogout() {
    localStorage.removeItem('userEmail')
    localStorage.removeItem('jwt')
    setIsLoggedIn(false)
    setUserEmail('')
    navigate('/signin', { replace: true })
  }

  if (isLoading) return <div>Carregando...</div>

  return (
    <div className="page">
      <Header handleLogout={handleLogout} userEmail={userEmail} />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <Login setIsLoggedIn={setIsLoggedIn} setUserEmail={setUserEmail} />
          }
        />
        <Route path="/signup" element={<Register />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
