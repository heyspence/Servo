import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeErrors } from "../../store/errors";
import { updateUserAddress } from "../../store/session";
import UpdateFormErrors from "../UpdateFormErrors/UpdateFormErrors";

const UpdateAddressForm = ({ addresses }) => {
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [streetAddress, setStreetAddress] = useState(Object.entries(addresses)[0][1].streetAddress);
  const [streetAddress2, setStreetAddress2] = useState(Object.entries(addresses)[0][1].streetAddress2);
  const [city, setCity] = useState(Object.entries(addresses)[0][1].city);
  const [state, setState] = useState(Object.entries(addresses)[0][1].state);
  const [zipCode, setZipCode] = useState(Object.entries(addresses)[0][1].zipCode);
  // const [defaultAddress, setDefaultAddress] = useState(Object.entries(addresses)[0][1].default);
  const id = Object.entries(addresses)[0][0]

  const handleUpdateUserAddress = async (e) => {
    e.preventDefault();
    dispatch(removeErrors());

    const updatedUserAdress = {address: { streetAddress, street_address_2: streetAddress2, city, state, zipCode, id: Number(id) }}
    const res = await dispatch(updateUserAddress(updatedUserAdress));
    if (res?.ok) setEditMode(false);
  };

  return (
    <form onSubmit={handleUpdateUserAddress}>
      <h2>Address</h2>
      {editMode ? (
        <>
          <input
            type="text"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
            placeholder="Street Address"
          />
          <input
            type="text"
            value={streetAddress2}
            onChange={(e) => setStreetAddress2(e.target.value)}
            placeholder="Street Address 2"
          />
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
          />
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Zip Code"
          />
          <UpdateFormErrors formType={"address"}/>
          <button type="submit" className="submit-button" disabled={zipCode === "" || state === "" || city === "" || streetAddress === ""}>Save</button>
        </>
      ) : (
        <div className="display-mode-div">
          <div className="info-content">
            <div className="info-item">
              <span>Street Address:</span> {streetAddress}
            </div>
            <div className="info-item">
              <span>Street Address 2:</span> {streetAddress2}
            </div>
            <div className="info-item">
              <span>City:</span> {city}
            </div>
            <div className="info-item">
              <span>State:</span> {state}
            </div>
            <div className="info-item">
              <span>Zip code:</span> {zipCode}
            </div>
          </div>
          <div className="edit-btn" onClick={() => setEditMode(true)}>Edit</div>
        </div>
      )}
    </form>
  )
}

export default UpdateAddressForm