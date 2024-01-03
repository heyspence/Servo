import './Selector.css'

const Selector = ({name, title, options}) => {
    return (
        <div className="custom-select">
            <label htmlFor={name}>{title}</label>
            <select id={name}>
                <option>Select One</option>
                {options && Object.values(options).map((option, index) => {
                    return <option key={index} value={option?.value}>{option?.name}</option>
                })}
            </select>
        </div>
    )
}

export default Selector;