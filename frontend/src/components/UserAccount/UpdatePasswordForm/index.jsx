import { useState } from "react";
import { removeErrors } from "../../store/errors";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/users";
import { signIn } from "../../store/session";
import { useEffect } from "react";
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

    let userData = {
      email: user.email,
      password: currentPassword
    }

    if (newPassword === confirmNewPassword) { 
      const res1 = await dispatch(signIn(userData))
      if (res1?.ok) {
        const updatedUser = { password: newPassword, id: user.id }; 
        const res2 = await dispatch(updateUser(updatedUser));

        if (res2?.ok) onClose() // or display msg that password updated successfully
      } 
    } else {
        setError("Confirm Password field must be the same as the Password field");
      }
  }

  useEffect(() => {
    dispatch(removeErrors());
  }, [dispatch])

  return (
    <form onSubmit={handleUpdatePassword} className="update-password-form sign-up-form checkout-form">
      <h2>Password</h2>
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