import { useState } from "react";
import Errors from "../../Session/Errors";
import { useDispatch } from "react-redux";
import { removeErrors } from "../../store/errors";
import { updateUser } from "../../store/users";
import { updateUserAddress } from "../../store/session";

const UpdateAddressForm = ({ addresses, user }) => {
  console.log('🦋🦋🦋 ~ addresses:', addresses);
  const dispatch = useDispatch();

  const [streetAddress, setStreetAddress] = useState(addresses.streetAddress);
  const [streetAddress2, setStreetAddress2] = useState(addresses.streetAddress2);
  const [city, setCity] = useState(addresses.city);
  const [state, setState] = useState(addresses.state);
  const [zipCode, setZipCode] = useState(addresses.zipCode);
  // const [defaultAddress, setDefaultAddress] = useState(addresses.default);

  const handleUpdateUserAddress = (e) => {
    e.preventDefault();
    dispatch(removeErrors());

    const updatedUserAdress = { streetAddress, streetAddress2, city, state, zipCode, id: addresses.addressableId };
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
      <Errors />
      <button type="submit">Save</button>
    </form>
  )
}

export default UpdateAddressForm