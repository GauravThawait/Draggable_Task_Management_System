import React, { useContext } from 'react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaTimes} from "react-icons/fa"
import "./Header.css"
import { remove_token } from '../../utils/storage'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../utils/AuthContext'


const Header = () => {

    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
    const navRef = useRef();
    const navigate = useNavigate();
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav")
    }

    const logout = async () => {
      remove_token();
      setIsLoggedIn(false)
      navigate('/login');
    }

  return (
    <div className="navbar">
      <header>
        <Link to="/feed">
          <>AW Assignment</>
        </Link>

        <nav ref={navRef}  >

          <Link onClick={showNavbar} to="/feed" className="nav-element">
            <p>Feed</p>
          </Link>

          <Link onClick={showNavbar} to="/tasks" className="nav-element">
            <p>Task</p>
          </Link>

          <Link to="/login" className="nav-element">
            <div className="signin_but">
              <p>Sign In</p>
            </div>
          </Link>

          { isLoggedIn &&<Link to="/login" className="nav-element">
            <div className="signin_but" onClick={logout} >
              <p>Log Out</p>
            </div>
          </Link>
          }

          <button className="nav-btn nav-close-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
        </nav>

        <button className="nav-btn" onClick={showNavbar}>
          <FaBars />
        </button>
      </header>
    </div>
  )
}

export default Header