import './RadioButton.css'

const RadioButton = ({options}) => {
    return (
        <div className="radio-buttons">
            {options && options.map((option, index) => {
                return(
                    <>
                        <input type="radio" id={`radio-${index}`} name="radio-button" value={option.value}/>
                        <label htmlFor={`radio-${index}`}>{option.name}</label><br/>
                    </>
                )
            })}
        </div>
    )
}

export default RadioButton;