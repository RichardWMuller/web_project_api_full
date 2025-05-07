import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { authorize } from '../utils/auth'


function Login({ setIsLoggedIn, setUserEmail}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

 

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const credentials = { email, password }
      const response = await authorize(credentials)

      if (response.status === 401 || response.status === 400) {
        throw new Error(`Chamada inválida: ${response.status}`)
      }

      const data = await response.json()
      if (!data?.token) {
        throw new Error(`Token inválida: ${data}`)
      }
      localStorage.setItem('jwt', data.token)
      localStorage.setItem('userEmail', email)
      setUserEmail(email);
      setIsLoggedIn(true); 
      navigate('/')
    } catch (error) {
      console.log('ERROR - LOGIN:', error)
    }
  }

  return (
    <div className="page">
 

      <h2 className="form__title">Entrar</h2>
      <form className="form__content" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          className="form__input"
          placeholder="E-mail"
          name="email"
          minLength="2"
          maxLength="30"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <span className="form__input-error"></span>
        <input
          type="password"
          id="password"
          className="form__input"
          name="password"
          placeholder="Senha"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <span className="form__input-error"></span>

        <button type="submit" className="form__button">
          Entrar
        </button>
      </form>
      <Link to="/signup" className="page__call-link">
        Ainda não é membro? Inscreva-se aqui!
      </Link>
    </div>
  )
}

export default Login
