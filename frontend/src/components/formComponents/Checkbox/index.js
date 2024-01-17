import { useState } from 'react';
import './Checkbox.css'

const Checkbox = ({name, options, onChange}) => {
    const optionsArray = Object.values(options);
    const [checked, setChecked] = useState(false);

    return (
        <div className="checkbox">
            <label>{name}</label><br/>
            {options && optionsArray.map(option => (
                <div className="checkbox-small-container" key={option?.id}>
                    <input type="checkbox" 
                    value={option?.value} 
                    key={option?.id}
                    onChange={(e) => {
                        if(!checked){
                            onChange(e.target.value)
                        }else{
                            onChange(undefined)
                        }
                        setChecked(!checked)
                    }}></input>
                    <label>{option?.name}</label>
                </div>
            ))}
        </div>
    )
}

export default Checkbox;