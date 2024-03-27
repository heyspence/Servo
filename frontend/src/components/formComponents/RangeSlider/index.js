import { useEffect, useRef, useState } from 'react'
import './RangeSlider.css'
import { ReactComponent as Tooltip } from '../../../assets/svg/ToolTip.svg';

const RangeSlider = ({name, options, onChange}) => {
    const optionsArray = Object.values(options)
    const max = optionsArray.find(item => item.optionType === "max")?.value
    const min = optionsArray.find(item => item.optionType === "min")?.value
    const step = optionsArray.find(item => item.optionType === "step")?.value
    const tooltip = optionsArray.find(item => item.optionType === "tooltip")?.name
    const defaultValue = optionsArray.find(item => item.optionType === "default")?.value
    const [sliderValue, setSliderValue] = useState(defaultValue);
    const outputEl = useRef(null);
    const sliderEl = useRef(null);

    useEffect(()=>{
        if(defaultValue){
            onChange({label: name, value: defaultValue, name: defaultValue})
        }
        let percent = (defaultValue - min) / (max - min) * 100
        outputEl.current.style.left = `calc((${percent}% - 30px) + 30px)`
    },[defaultValue])

    const onSliderChange = (val) => {
        setSliderValue(val.value)
        onChange({label: name, value: val.value, name: val.value})
        // let percent = (val - min) / (max - min)
        // let currentSliderWidth = sliderEl.current.offsetWidth
        // let currentValueWidth = outputEl.current.offsetWidth
        // let adjustedLeft = percent * (currentSliderWidth - currentValueWidth)
        // let newLeft = adjustedLeft + (currentValueWidth / 2)
        // outputEl.current.style.left = newLeft + 'px'
    }

    const toolTipDiv = <div class="tooltip"><Tooltip />
                            <span class="tooltiptext">{tooltip}</span>
                        </div>

    return (
        <div className="range-slider-container">
            <label>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {name}{tooltip ? toolTipDiv : ''}
                </div>
                <output ref={outputEl} className="slider-value">
                    {sliderValue}
                </output>
            </label>
            <input className="range-slider" 
                    type="range" max={max} 
                    min={min} step={step} 
                    value={sliderValue} 
                    ref={sliderEl}
                    onChange={(e) => {
                        onSliderChange(e.target)
                    }}>
            </input>
        </div>
    )
}

export default RangeSlider;