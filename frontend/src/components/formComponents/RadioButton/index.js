import { useEffect } from 'react'
import './RadioButton.css'
import { useState } from 'react';

const RadioButton = ({name, options, onChange}) => {
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (e) => {
        const option = Object.values(options).find(({id}) => id === Number(e.target.id))
        setSelectedValue(option.value.toString())
        onChange({label: name, value: option.value, name: option.name})
    }

    useEffect(() => {
        if (options) {
            const defaultOption = selectedValue === '' ? Object.values(options).find(option => option.default === true) : null;
            if (defaultOption) {
                setSelectedValue(defaultOption.value.toString());
                onChange({label: name, value: defaultOption.value, name: defaultOption.name});
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
                        id={option.id} 
                        name={name} 
                        value={option.value} 
                        onChange={e => handleChange(e)}
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