import './Selector.css'

const Selector = ({name, title, options}) => {
    return (
        <div className="custom-select">
            <label htmlFor={name}>{title}</label>
            <select id={name}>
                <option>Select One</option>
                {options && options.map((option, index) => {
                    return <option key="index">{option}</option>
                })}
            </select>
        </div>
    )
}

export default Selector;