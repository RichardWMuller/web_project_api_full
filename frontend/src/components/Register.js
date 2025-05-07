import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { register } from '../utils/auth'
import InfoTooltip from '../components/InfoTooltip'
import Popup from './Popup'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hasSubmitSucceeded, setHasSubmitSucceeded] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const credentials = { email, password }
      const { ok, data } = await register(credentials)

      setHasSubmitSucceeded(ok)
      handleOpenModal()

      if (ok.status !== 201) {
        throw new Error(`Chamada invalida: ${ok.status}`)
      }
    } catch (error) {
      console.log('ERROR - REGISTER:', error)
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    navigate('/signin')
  }

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  return (
    <div className="page">
      <Popup isOpen={isModalOpen} onClosePopup={handleCloseModal} readOnly>
        <InfoTooltip state={hasSubmitSucceeded} />
      </Popup>
      <h2 className="form__title">Inscreva-se</h2>
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
          Inscrever-se
        </button>
      </form>
      <Link to="/signin" className="page__call-link">
        Já é um membro? Faça o login aqui!
      </Link>
    </div>
  )
}

export default Register
