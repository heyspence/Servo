import './RangeSlider.css'

const RangeSlider = ({name, options, onChange}) => {
    const optionsArray = Object.values(options)
    const max = optionsArray.find(item => item.optionType === "max").value
    const min = optionsArray.find(item => item.optionType === "min").value
    const step = optionsArray.find(item => item.optionType === "step").value

    return (
        <div className="range-slider">
            <label>{name}</label>
            <input type="range" max={max} min={min} step={step} onChange={(e) => {
                onChange(e.target.value)
            }}></input>
        </div>
    )
}

export default RangeSlider;