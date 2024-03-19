import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./UserAccount.css";
import { updateUser } from "../store/users";
import Errors from "../Session/Errors";
import { removeErrors } from "../store/errors";

const UserAccount = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [newPassword, setNewPassword] = useState("");

  const user = useSelector((state) => state.session?.user);
  if (!user) history.push("/");
  const [accountFormValues, setAccountFormValues] = useState({ ...user });

  const handleUpdateUser = (e) => {
    e.preventDefault();
    dispatch(removeErrors())
    const { id, firstName, lastName, email, phoneNumber } = accountFormValues;
    const updatedUserData = { id, firstName, lastName, email, phoneNumber, password: newPassword };
    dispatch(updateUser(updatedUserData));
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
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
          <Errors />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default UserAccount;
