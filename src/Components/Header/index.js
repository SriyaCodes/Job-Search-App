import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <ul className="header-bg">
      <li>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
      </li>
      <li>
        <ul className="header-unordered-bg">
          <li className="header-list-item">
            <Link to="/" className="header-link-style">
              Home
            </Link>
          </li>
          <li className="header-list-item">
            <Link to="/jobs" className="header-link-style">
              Jobs
            </Link>
          </li>
        </ul>
      </li>
      <li>
        <button type="button" className="header-btn" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </ul>
  )
}
export default withRouter(Header)
