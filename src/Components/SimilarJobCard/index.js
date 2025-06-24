import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="sjc-item-container">
      <div className="logo-title-rating-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="sjc-description-heading">Description</h1>
      <p className="sjc-description-para">{jobDescription}</p>
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
    </li>
  )
}

export default SimilarJobCard
