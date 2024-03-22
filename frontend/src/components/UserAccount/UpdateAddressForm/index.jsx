import { useState } from "react";
import Errors from "../../Session/Errors";
import { useDispatch } from "react-redux";
import { removeErrors } from "../../store/errors";
import { updateUser } from "../../store/users";
import { updateUserAddress } from "../../store/session";
import UpdateFormErrors from "../UpdateFormErrors/UpdateFormErrors";

const UpdateAddressForm = ({ addresses, user }) => {
  // console.log('🦋🦋🦋 ~ addresses:', Object.entries(addresses)[0][0]);
  const dispatch = useDispatch();

  const [streetAddress, setStreetAddress] = useState(Object.entries(addresses)[0][1].streetAddress);
  const [streetAddress2, setStreetAddress2] = useState(Object.entries(addresses)[0][1].streetAddress2);
  const [city, setCity] = useState(Object.entries(addresses)[0][1].city);
  const [state, setState] = useState(Object.entries(addresses)[0][1].state);
  const [zipCode, setZipCode] = useState(Object.entries(addresses)[0][1].zipCode);
  // const [defaultAddress, setDefaultAddress] = useState(Object.entries(addresses)[0][1].default);
  const id = Object.entries(addresses)[0][0]

  const handleUpdateUserAddress = (e) => {
    e.preventDefault();
    dispatch(removeErrors());

    const updatedUserAdress = {address: { streetAddress, streetAddress2, city, state, zipCode, id: Number(id) }}
    dispatch(updateUserAddress(updatedUserAdress));
  };

  return (
    <form onSubmit={handleUpdateUserAddress}>
      <h2>Address</h2>
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
      <button type="submit" disabled={zipCode === "" || state === "" || city === "" || streetAddress === ""}>Save</button>
    </form>
  )
}

export default UpdateAddressForm