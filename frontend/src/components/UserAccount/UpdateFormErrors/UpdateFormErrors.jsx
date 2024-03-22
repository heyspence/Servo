import { useSelector } from "react-redux";

const UpdateFormErrors = ({ formType }) => {
    const errors = useSelector(state => state.errors)
    
    if (!errors || errors.length === 0) return null;
    const tempGeneralErrors = ["First", "Last", "Phone", "Email"]
    const generalErrors = new Set(tempGeneralErrors)
    const tempPasswordErrors = ["password", "Password"]
    const passwordErrors = new Set(tempPasswordErrors)
    const tempAddressErrors = ["Street", "City", "State", "Zip"]
    const addressErrors = new Set(tempAddressErrors)

    return (
        <ul>
            {errors && errors.map((error, index)=>{
                if (error === "Password digest can't be blank") return null;
                if (formType === "address" && error.split(" ").some(word => generalErrors.has(word) || passwordErrors.has(word))) return null
                if (formType === "general" && error.split(" ").some(word => passwordErrors.has(word)|| addressErrors.has(word))) return null
                if (error.includes('Addresses') ){
                    let correctedError = error.replace('Addresses', 'Address')
                    return <li key={index} className="errors">{correctedError}</li>;
                }
                if (error.includes('Password') ){
                    let correctedError = error.replace('Password', 'New Password')
                    return <li key={index} className="errors">{correctedError}</li>;
                }
                return <li key={index} className="errors">{error}</li>;
            })}
        </ul>
    )
}

export default UpdateFormErrors;