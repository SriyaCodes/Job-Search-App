import './index.css'

const SalaryRangeList = props => {
  const {salaryDetails, onClickSalaryEl} = props
  const {salaryRangeId, label} = salaryDetails

  const onClickSalaryRange = () => {
    onClickSalaryEl(salaryRangeId)
  }

  return (
    <li className="srl-list-item-container">
      <input
        type="radio"
        id={salaryRangeId}
        name="salaryRadioEl"
        onClick={onClickSalaryRange}
      />
      <label htmlFor={salaryRangeId} className="employement-label-el">
        {label}
      </label>
    </li>
  )
}

export default SalaryRangeList
