const UpdateAddressForm = ({ prevAddress, user }) => {

  return (
    <>
      <h2>Address</h2>
      <p>{prevAddress[user.id-1].city}</p>
      {prevAddress[user.id-1].streetAddress}
      {prevAddress[user.id-1].state}
      {prevAddress[user.id-1].zipCode}

      {prevAddress[user.id-1].streetAddress2}
    </>
  )
}

export default UpdateAddressForm