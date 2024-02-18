import { useState } from 'react';
import './AddressForm.css'
import { useDispatch } from 'react-redux';
import { createUserAddress } from '../../store/session';

const AddressForm = ({currentUser}) => {
    const userType = currentUser?.vendorId ? 'Vendor' : 'User'
    const userId = currentUser?.id
    
    const [addressValues, setAddressValues] = useState({ 
        default: true, 
        addressableType: userType, 
        addressableId: userId,
        state: "UT",
        city: "St George",
        zipCode: '07304',
        streetAddress: '',
        street_address_2: ''
    });
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(addressValues.streetAddress){
            dispatch(createUserAddress({address: addressValues}))
        }
    }

    return (
        <div className="address-form-container">
            <form className="address-form" onSubmit={handleSubmit}>
                <h3 style={{marginBottom: '5px'}}>Enter Address to Continue</h3>
                {/* <label className="street-address-label">Street Address</label> */}
                <input type="text" placeholder='Your Address' value={addressValues.streetAddress} onChange={e => setAddressValues(prevValues => ({...prevValues, streetAddress: e.target.value}))}></input>
                {/* <label>Zip Code</label>
                <select onChange={e => setAddressValues(prevValues => ({...prevValues, zipCode: e.target.value}))}>
                    <option>Select One</option>
                    <option>84765</option>
                    <option>84770</option>
                    <option>84780</option>
                    <option>84790</option>
                </select> */}
                <button type="submit">Save</button>
            </form>
        </div>
    )}

export default AddressForm;