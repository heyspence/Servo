import { useSelector } from "react-redux";

const UpdateFormErrors = ({ formType }) => {
    const errors = useSelector(state => state.errors)
    
    if (!errors || errors.length === 0) return null;
    const tempGeneralErrors = ["First", "Last", "Phone", "Email"]
    const generalErrors = new Set(tempGeneralErrors)
    const tempPasswordErrors = ["password", "Password"]
    const passwordErrors = new Set(tempPasswordErrors)

    return (
        <div className="errors">
            <ul>
                {errors && errors.map((error, index)=>{
                    if(error === "Password digest can't be blank") return null;
                    if (formType === "address" && error.split(" ").some(word => generalErrors.has(word) || passwordErrors.has(word))) return null
                    if (formType === "general" && error.split(" ").some(word => passwordErrors.has(word))) return null
                    if(error.includes('Addresses')){
                        let correctedError = error.replace('Addresses', 'Address')
                        return <li key={index}>{correctedError}</li>;
                    }
                    return <li key={index}>{error}</li>;
                })}
            </ul>
        </div>
    )
}

export default UpdateFormErrors;