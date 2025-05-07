import logo from '../images/Vector.png'
import { Link, useLocation, useNavigate } from 'react-router-dom'


export default function Header({ handleLogout, userEmail }) {
 
  const location = useLocation()
  const navigate = useNavigate()
  

  const handleLogoutClick = () => {
   
    handleLogout()
    
    navigate('/signin')
  }

  const getNavLink = () => {
    switch (location.pathname) {
      case '/':
        return (
          <>
            <p>{userEmail}</p>
            <Link onClick={handleLogoutClick}>Sair</Link>
          </>
        )
      case '/signup':
        return <Link to="/signin">Faça o Login</Link>
      case '/signin':
        return <Link to="/signup">Entrar</Link>
        default:
          return null
    }
  }

  return (
    <header className="header">
      <div className="header-content">
        <img
          className="header__logo"
          src={logo}
          alt="Logo escrito Around the U.S."
        />
        <div className="navbar">{getNavLink()}</div>
      </div>
    </header>
  )
}
