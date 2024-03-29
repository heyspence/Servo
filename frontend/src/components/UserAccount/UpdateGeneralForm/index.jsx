import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeErrors } from "../../store/errors";
import { updateUser } from "../../store/users";
import UpdateFormErrors from "../UpdateFormErrors/UpdateFormErrors";

const UpdateGeneralForm = ({ accountFormValues, setAccountFormValues }) => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);

  const { id, firstName, lastName, email, phoneNumber } = accountFormValues;

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    dispatch(removeErrors());

    const updatedUserData = { id, firstName, lastName, email, phoneNumber };
    const res = await dispatch(updateUser(updatedUserData));
    if (res?.ok) setEditMode(false);
  };

  const formatPhoneNumber = phoneNumber => phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');

  return (
    <form onSubmit={handleUpdateUser}>
      <h2>General</h2>
      {editMode ? (
        <>
          <input
            type="text"
            value={firstName}
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
            value={lastName}
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
            value={phoneNumber}
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
            value={email}
            onChange={(e) => {
              setAccountFormValues((prevValues) => ({
                ...prevValues,
                email: e.target.value,
              }));
            }}
            placeholder="Email"
          />
          <UpdateFormErrors formType={"general"} />
          <button
          type="submit"
          className="submit-button"
          disabled={email === "" || phoneNumber === "" || firstName === "" || lastName === ""} 
          >Save</button>
        </>
      ) : (
        <div className="display-mode-div">
          <div className="info-content">
            <div className="info-item">
              <span>First Name:</span> {firstName}
            </div>
            <div className="info-item">
              <span>Last Name:</span> {lastName}
            </div>
            <div className="info-item">
              <span>Phone Number:</span> {formatPhoneNumber(phoneNumber)}
            </div>
            <div className="info-item">
              <span>Email:</span> {email}
            </div>
          </div>
          <div className="edit-btn" onClick={() => setEditMode(true)}>Edit</div>
        </div>
      )}
    </form>
  );
};

export default UpdateGeneralForm;
