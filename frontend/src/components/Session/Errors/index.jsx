import { useSelector } from "react-redux";
import './Errors.css'

const Errors = () => {
    const errors = useSelector(state => state.errors)
    if(!errors || errors.length === 0) return null;

    return (
        <div className="errors">
            <ul>
                {errors && errors.map((error, index)=>{
                    if(error === "Password digest can't be blank") return null;
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

export default Errors;