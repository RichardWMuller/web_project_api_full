import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { authorize } from '../utils/auth'
import Popup from './Popup'
import InfoTooltip from '../components/InfoTooltip'

function Login({ setIsLoggedIn, setUserEmail }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasSubmitSucceeded, setHasSubmitSucceeded] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setHasSubmitSucceeded(null)

    try {
      const credentials = { email, password }
      const data = await authorize(credentials)
      if (!data.token) {
        throw new Error('Token inválido')
      }

      localStorage.setItem('jwt', data.token)
      localStorage.setItem('userEmail', email)
      setUserEmail(email)
      setIsLoggedIn(true)

      
      navigate('/')
    } catch (error) {
      console.log('ERROR - LOGIN:', error)
      setHasSubmitSucceeded(false) 
      setIsModalOpen(true)
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false)
  }

  return (
    <div className="page">
      <h2 className="form__title">Entrar</h2>

      
      <Popup isOpen={isModalOpen && hasSubmitSucceeded === false} onClosePopup={handleCloseModal} readOnly>
        <InfoTooltip state={false} />
      </Popup>

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
