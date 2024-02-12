import './RadioButton.css'

const RadioButton = ({name, options, onChange}) => {
    const handleChange = (e) => {
        onChange(e.target.value)
    }

    return (
        <div className="radio-buttons">
            <label>{name}</label><br/>
            {options && Object.values(options).map((option, index) => {
                return(
                    <li key={index}>
                        <input type="radio" id={`radio-${index}`} name={name} value={option.value} onChange={handleChange}/>
                        <label htmlFor={`radio-${index}`}>{option.name}</label><br/>
                    </li>
                )
            })}
        </div>
    )
}

export default RadioButton;