import { useState } from "react";
import { removeErrors } from "../../store/errors";
import { useDispatch } from "react-redux";
import { updateUser } from "../../store/users";
import Errors from "../../Session/Errors";

const UpdatePasswordForm = ({ user }) => {
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    setError("");
    dispatch(removeErrors());

    if (newPassword === confirmNewPassword && newPassword !== "") { // temp: newPassword !== ""
      const updatedUser = { password: newPassword, id: user.id }; 
      dispatch(updateUser(updatedUser));
    } else {
      setError("Confirm Password field must be the same as the Password field");
    }
  };

  return (
    <form onSubmit={handleUpdatePassword}>
      <h2>Password</h2>
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
      <button type="submit">Save</button>
    </form>
  )
}

export default UpdatePasswordForm