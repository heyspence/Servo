import { useDispatch } from "react-redux"
import { removeErrors } from "../../store/errors";
import { updateUser } from "../../store/users";
import UpdateFormErrors from "../UpdateFormErrors/UpdateFormErrors";

const UpdateGeneralForm = ({ accountFormValues, setAccountFormValues }) => {
  const dispatch = useDispatch();

  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(removeErrors());

    const { id, firstName, lastName, email, phoneNumber } = accountFormValues;
    const updatedUserData = { id, firstName, lastName, email, phoneNumber };
    dispatch(updateUser(updatedUserData));
  };

  return (
    <form onSubmit={handleUpdateUser}>
      <h2>General</h2>
      <input
        type="text"
        value={accountFormValues.firstName}
        onChange={(e) => {
          setAccountFormValues((prevValues) => ({
            ...prevValues,
            firstName: e.target.value,
          }));
        }}
        placeholder="First Name"
      />
      <input
        type="text"
        value={accountFormValues.lastName}
        onChange={(e) => {
          setAccountFormValues((prevValues) => ({
            ...prevValues,
            lastName: e.target.value,
          }));
        }}
        placeholder="Last Name"
      />
      <input
        type="tel"
        value={accountFormValues.phoneNumber}
        onChange={(e) => {
          setAccountFormValues((prevValues) => ({
            ...prevValues,
            phoneNumber: e.target.value,
          }));
        }}
        placeholder="Phone Number"
      />
      <input
        type="text"
        value={accountFormValues.email}
        onChange={(e) => {
          setAccountFormValues((prevValues) => ({
            ...prevValues,
            email: e.target.value,
          }));
        }}
        placeholder="Email"
      />
      <UpdateFormErrors formType={"general"}/>
      <button type="submit">Save</button>
    </form>
  )
}

export default UpdateGeneralForm