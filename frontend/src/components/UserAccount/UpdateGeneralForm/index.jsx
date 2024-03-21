import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeErrors } from "../../store/errors";
import { updateUser } from "../../store/users";
import UpdateFormErrors from "../UpdateFormErrors/UpdateFormErrors";

const UpdateGeneralForm = ({ accountFormValues, setAccountFormValues }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    dispatch(removeErrors());

    const { id, firstName, lastName, email, phoneNumber } = accountFormValues;
    const updatedUserData = { id, firstName, lastName, email, phoneNumber };
    const res = await dispatch(updateUser(updatedUserData));
    if (res?.ok) setEditMode(false);
  };

  return (
    <form onSubmit={handleUpdateUser}>
      <h2>General</h2>
      {editMode ? (
        <>
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
          <button type="submit">Save</button>
        </>
      ) : (
        <>
          <div className="">{accountFormValues.firstName}</div>
          <div>{accountFormValues.lastName}</div>
          <div>{accountFormValues.phoneNumber}</div>
          <div>{accountFormValues.email}</div>
          <div className="edit-btn" onClick={() => setEditMode(true)}>Edit</div>
        </>
      )}
      <UpdateFormErrors formType={"general"} />
    </form>
  );
};

export default UpdateGeneralForm;
