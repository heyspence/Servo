import { useState, useEffect } from "react";
import { removeErrors } from "../../store/errors";
import { useDispatch } from "react-redux";
import { updatePassword } from "../../store/users";
import "./UpdatePasswordForm.css"
import UpdateFormErrors from "../UpdateFormErrors/UpdateFormErrors";

const UpdatePasswordForm = ({ user, onClose }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    dispatch(removeErrors());

    let updatedPasswordData = {
      password: currentPassword,
      newPassword,
      userId: user.id
    }

    if (newPassword === confirmNewPassword) { 
      const res = await dispatch(updatePassword(updatedPasswordData))
        if (res?.ok) onClose() // or display msg that password updated successfully
    } else {
        setError("Confirm Password field must be the same as the Password field");
      }
  }

  useEffect(() => {
    dispatch(removeErrors());
  }, [dispatch])

  return (
    <form onSubmit={handleUpdatePassword} className="update-password-form sign-up-form checkout-form">
      <h2>Update Password</h2>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="Current Password"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="New Password"
        />
        <input
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          placeholder="Confirm New Password"
        />
      {error !== "" && <p className="errors">{error}</p>}
      <UpdateFormErrors />
      <h3 className="suggestion">Password Security Tips:</h3>
      <ul id="suggestions">
        <li>1 letter</li>
        <li>1 number or special character (example: # ? ! &)</li>
        <li>10 characters</li>
      </ul>
      <button 
        type="submit" 
        disabled={currentPassword === "" || newPassword === "" || confirmNewPassword === ""} 
        className="submit-button"
      >
        Save
      </button>
    </form>
  )
}

export default UpdatePasswordForm