import { useEffect } from 'react'
import './RadioButton.css'
import { useState } from 'react';

const RadioButton = ({name, options, onChange}) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (e) => {
        setSelectedValue(e.target.value)
        onChange(e.target.value)
    }

    useEffect(() => {
        if (options) {
            const defaultOption = selectedValue === '' ? Object.values(options).find(option => option.default === true) : null;
            if (defaultOption) {
                setSelectedValue(defaultOption.value.toString());
                onChange(defaultOption.value);
            }
        }
    }, [options, onChange])

    return (
        <div className="radio-buttons">
            <label>{name}</label>
            {options && Object.values(options).map((option, index) => {
                return(
                    <li key={index}>
                        <input type="radio" 
                        id={`radio-${index}`} 
                        name={name} 
                        value={option.value} 
                        onChange={handleChange}
                        checked={selectedValue === option.value.toString()}
                    />
                        <label htmlFor={`radio-${index}`}>{option.name}</label><br/>
                    </li>
                )
            })}
        </div>
    )
}

export default RadioButton;