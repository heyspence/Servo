import { useHistory } from "react-router-dom";
import "./UserAccount.css";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn } from "../store/session";
import { useState } from "react";
import { updateUser } from "../store/users";

const UserAccount = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return {
      user: state.session?.user ? state.session.user : {},
    };
  });
  const history = useHistory();
  const [accountFormValues, setAccountFormValues] = useState({ ...user });

  if (Object.values(user).length === 0) history.push("/");

  const handleUpdateUser = () => {
    const { id, firstName, lastName, email, phoneNumber } = accountFormValues;
    const updatedUserData = {
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
    }; // temp since snake_case_params isnt working on backend
    // debugger;
    dispatch(updateUser(updatedUserData, id));
  };

  return (
    <div className="user-account">
      <div className="user-account-backdrop">
        <h1>Account Settings</h1>
        <form onSubmit={handleUpdateUser}>
          <input
            type="text"
            value={accountFormValues.firstName}
            onChange={(e) => {
              setAccountFormValues((prevValues) => ({
                ...prevValues,
                firstName: e.target.value,
              }));
            }}
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
          />
          <input
            type="text"
            value={accountFormValues.phoneNumber}
            onChange={(e) => {
              setAccountFormValues((prevValues) => ({
                ...prevValues,
                phoneNumber: e.target.value,
              }));
            }}
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
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default UserAccount;
