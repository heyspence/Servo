import React, { useEffect, useRef, useState } from "react";
import "./RangeSlider.css";

const RangeSlider = ({ name, options, onChange }) => {
  const optionsArray = Object.values(options);
  const max = optionsArray.find((item) => item.optionType === "max")?.value;
  const min = optionsArray.find((item) => item.optionType === "min")?.value;
  const step = optionsArray.find((item) => item.optionType === "step")?.value;
  const defaultValue = optionsArray.find(
    (item) => item.optionType === "default"
  )?.value;

  const [sliderValue, setSliderValue] = useState(defaultValue);
  const outputEl = useRef(null);
  const sliderEl = useRef(null);
  const ticks = [];

  useEffect(() => {
    if (defaultValue) {
      onChange({ label: name, value: defaultValue, name: defaultValue });
    }
    let percent = ((defaultValue - min) / (max - min)) * 100;
    outputEl.current.style.left = `calc((${percent}% - 30px) + 30px)`;
  }, [defaultValue]);

  const onSliderChange = (val) => {
    setSliderValue(val.value);
    onChange({ label: name, value: val.value, name: val.value });
  };

  const generateTicks = () => {
    for (let i = min; i <= max; i += step) {
      ticks.push(
        <div
          key={i}
          className="tick"
          style={{ left: `${((i - min) / (max - min)) * 100}%` }}
        >
          <span className="tick-value">{i}</span>
        </div>
      );
    }
  };

  generateTicks();

  return (
    <div className="range-slider-container">
      <label>{name}</label>
      <output ref={outputEl} className="slider-value">
        {sliderValue}
      </output>
      <div className="ticks-container">{ticks}</div>
      <input
        className="range-slider"
        type="range"
        max={max}
        min={min}
        step={step}
        value={sliderValue}
        ref={sliderEl}
        onChange={(e) => onSliderChange(e.target)}
      ></input>
    </div>
  );
};

export default RangeSlider;
