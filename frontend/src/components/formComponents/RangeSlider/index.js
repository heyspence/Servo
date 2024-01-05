import { useEffect, useState } from 'react'
import './RangeSlider.css'

const RangeSlider = ({name, options, onChange}) => {
    const optionsArray = Object.values(options)
    const max = optionsArray.find(item => item.optionType === "max")?.value
    const min = optionsArray.find(item => item.optionType === "min")?.value
    const step = optionsArray.find(item => item.optionType === "step")?.value
    const defaultValue = optionsArray.find(item => item.optionType === "default")?.value
    const [sliderValue, setSliderValue] = useState(defaultValue);

    useEffect(()=>{
        onChange(defaultValue ? defaultValue : '')
    },[])

    return (
        <div className="range-slider">
            <label htmlFor="range-slider">{name}</label>
            <input id="range-slider" type="range" max={max} min={min} step={step} value={sliderValue} onChange={(e) => {
                setSliderValue(e.target.value)
                onChange(e.target.value)
            }}></input>
            <output htmlFor="range-slider" className="slider-value">
                {sliderValue}
            </output>
        </div>
    )
}

export default RangeSlider;