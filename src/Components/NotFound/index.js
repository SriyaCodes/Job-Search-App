import './index.css'

const NotFound = () => (
  <div className="not-found-bg">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 className="nf-heading">Page Not Found</h1>
    <p className="nf-desc">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
