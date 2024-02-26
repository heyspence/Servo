import './Selector.css'

const Selector = ({name, options, onChange}) => {

    return (
        <div className="custom-select">
            <label htmlFor={name}>{name}</label>
            <div className="select-wrapper">
                <select id={name} onChange={e => onChange(e.target.value)}>
                    <option value={''}>Select One</option>
                    {options && Object.values(options).map((option, index) => {
                        return <option key={index} value={option?.value}>{option?.name}</option>
                    })}
                </select>
            </div>
        </div>
    )
}

export default Selector;