import './Selector.css'

const Selector = ({name, options, onChange}) => {
    const handleChange = (selectedElement) => {
        const selectedOption = selectedElement.options[selectedElement.selectedIndex];
        const dataName = selectedOption.getAttribute('data-name');
        onChange({label: name, value: selectedElement.value, name: dataName})
    }

    return (
        <div className="custom-select">
            <label htmlFor={name}>{name}</label>
            <div className="select-wrapper">
                <select id={name} onChange={e => handleChange(e.target)}>
                    <option value={''}>Select One</option>
                    {options && Object.values(options).map((option, index) => {
                        return <option key={index} value={option?.value} data-name={option?.name}>{option?.name}</option>
                    })}
                </select>
            </div>
        </div>
    )
}

export default Selector;