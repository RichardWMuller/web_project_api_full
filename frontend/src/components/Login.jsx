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
    setHasSubmitSucceeded(null) // limpa estado anterior

    try {
      const credentials = { email, password }
      const response = await authorize(credentials)

      if (!response.ok || !response.token) {
        throw new Error('Falha no login. Por favor, verifique suas credenciais.')
      }

      localStorage.setItem('jwt', response.token)
      localStorage.setItem('userEmail', email)
      setUserEmail(email)
      setIsLoggedIn(true)
      setHasSubmitSucceeded(true)
      setIsModalOpen(true)
    } catch (error) {
      console.log('ERROR - LOGIN:', error)
      setHasSubmitSucceeded(false)
      setIsModalOpen(true)
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    if (hasSubmitSucceeded) {
      navigate('/') // navega só se sucesso
    }
  }

  return (
    <div className="page">
      <h2 className="form__title">Entrar</h2>

      <Popup isOpen={isModalOpen} onClosePopup={handleCloseModal} readOnly>
        {hasSubmitSucceeded !== null && <InfoTooltip state={hasSubmitSucceeded} />}
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
