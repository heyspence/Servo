import { useState } from "react";
import { removeErrors } from "../../store/errors";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/users";
import Errors from "../../Session/Errors";
import { signIn } from "../../store/session";

const UpdatePasswordForm = ({ user, onClose }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const isCurrentPassword = async (e) => {
    e.preventDefault();
    setError("");
    dispatch(removeErrors());

    let userData = {
      email: user.email,
      password: currentPassword
    }

    if (newPassword === confirmNewPassword) { 
      const res = await dispatch(signIn(userData))
  
      if (res?.ok) {
        const updatedUser = { password: newPassword, id: user.id }; 
        const res = await dispatch(updateUser(updatedUser));
        if (res?.ok) onClose()
      } else {
        dispatch(removeErrors()); 
        setError("Current Password is incorrect");
      }
    } else {
        setError("Confirm Password field must be the same as the Password field");
      }
  }


  const handleUpdatePassword = (e) => {
    // e.preventDefault();


    // if (newPassword === confirmNewPassword && newPassword !== "") { // temp: newPassword !== ""
    //   const updatedUser = { password: newPassword, id: user.id }; 
    //   dispatch(updateUser(updatedUser));
    // } else {
    //   setError("Confirm Password field must be the same as the Password field");
    // }
  };

  return (
    <form onSubmit={isCurrentPassword}>
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
      {error !== "" && error}
      <Errors />
      <button type="submit" disabled={currentPassword === "" || newPassword === "" || confirmNewPassword === ""}>Save</button>
    </form>
  )
}

export default UpdatePasswordForm