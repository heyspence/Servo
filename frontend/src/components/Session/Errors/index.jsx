import { useSelector } from "react-redux";
import './Errors.css'

const Errors = () => {
    const errors = useSelector(state => state.errors)
    if(!errors || errors.length === 0) return null;

    return (
        <div className="errors">
            <ul>
                {errors && errors.map((error)=>{
                    if(error === "Password digest can't be blank") return null;
                    return <li key={error}>{error}</li>;
                })}
            </ul>
        </div>
    )
}

export default Errors;