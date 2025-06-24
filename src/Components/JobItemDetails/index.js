import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  isLoading: 'IS_LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobDetails: [],
    skillss: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.isLoading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        lifeAtCompanyDescription: data.job_details.life_at_company.description,
        lifeAtCompanyImageUrl: data.job_details.life_at_company.image_url,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        title: data.job_details.title,
      }
      const updatedSimilarJobs = data.similar_jobs.map(x => ({
        companyLogoUrl: x.company_logo_url,
        employmentType: x.employment_type,
        id: x.id,
        jobDescription: x.job_description,
        location: x.location,
        rating: x.rating,
        title: x.title,
      }))
      this.setState({
        jobDetails: updatedJobDetails,
        similarJobDetails: updatedSimilarJobs,
        skillss: updatedJobDetails.skills,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobItemDetails = () => {
    const {jobDetails, similarJobDetails, skillss} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails

    return (
      <div>
        <Header />
        <div className="jid-btm-sec-container">
          <div className="jid-btm-sec-card">
            <div className="logo-title-rating-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo"
              />
              <div className="title-rating-container">
                <h1 className="company-title">{title}</h1>
                <div className="star-rating-container">
                  <FaStar className="star-icon" />
                  <p className="rating-para">{rating}</p>
                </div>
              </div>
            </div>
            <div className="react-icons-text-container">
              <div className="xyz">
                <div className="react-icon-text-container">
                  <MdLocationOn className="react-icon" />
                  <p className="jid-location-para">{location}</p>
                </div>
                <div className="react-icon-text-container">
                  <BsBriefcaseFill className="react-icon" />
                  <p className="jid-location-para">{employmentType}</p>
                </div>
              </div>
              <p className="jid-package-para">{packagePerAnnum}</p>
            </div>
            <hr className="jid-hr" />
            <div className="description-heading-link-container">
              <h1 className="description-heading">Description</h1>
              <div className="jid-link-container">
                <a
                  href={`${companyWebsiteUrl}`}
                  target="_blank"
                  rel="noreferrer"
                  className="jid-anchor-el"
                >
                  Visit
                </a>
                <FaExternalLinkAlt className="jid-link-icon" />
              </div>
            </div>
            <p className="jid-description-para">{jobDescription}</p>
            <h1 className="jid-skills-heading">Skills</h1>
            <ul className="jid-skills-container">
              {skillss.map(eachItem => (
                <li key={eachItem.name} className="jid-skills-item-container">
                  <img
                    src={eachItem.imageUrl}
                    alt={eachItem.name}
                    className="jid-skills-item-image"
                  />
                  <p className="jid-skills-item-para">{eachItem.name}</p>
                </li>
              ))}
            </ul>
            <h1 className="jid-life-at-company-heading">Life at Company</h1>
            <div className="jid-life-at-company-container">
              <p className="jid-life-at-company-para">
                {lifeAtCompanyDescription}
              </p>
              <img src={lifeAtCompanyImageUrl} alt="life at company" />
            </div>
          </div>
          <h1 className="jid-similar-jobs-heading">Similar Jobs</h1>
          <ul className="jid-similar-cards-container">
            {similarJobDetails.map(eachObj => (
              <SimilarJobCard key={eachObj.id} similarJobDetails={eachObj} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderIsLoading = () => (
    <div>
      <Header />
      <div className="jid-btm-sec-container">
        <div className="loader-container-jobs" data-testid="loader">
          <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
        </div>
      </div>
    </div>
  )

  renderFailureView = () => (
    <div>
      <Header />
      <div className="jid-btm-sec-container">
        <div className="loader-container-jobs">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
            className="failure-view-image"
          />
          <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
          <p className="failure-view-para">
            We cannot seem to find the page you are looking for.
          </p>
          <button
            className="header-btn"
            type="button"
            onClick={this.getJobItemDetails}
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.isLoading:
        return this.renderIsLoading()
      case apiStatusConstants.success:
        return this.renderJobItemDetails()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }
}

export default JobItemDetails
