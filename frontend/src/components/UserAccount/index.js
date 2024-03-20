import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./UserAccount.css";
import UpdateAddressForm from "./UpdateAddressForm";
import UpdateGeneralForm from "./UpdateGeneralForm";
import UpdatePasswordForm from "./UpdatePasswordForm";

const UserAccount = () => {
  const history = useHistory();

  const user = useSelector((state) => state.session?.user);
  console.log('🦋🦋🦋 ~ user:', user);
  if (!user) history.push("/");
  const [accountFormValues, setAccountFormValues] = useState({ ...user });

  return (
    <div className="user-account">
      <div className="user-account-backdrop">
        <h1>Account Settings</h1>
        <UpdateGeneralForm
          accountFormValues={accountFormValues}
          setAccountFormValues={setAccountFormValues}
        />
        <UpdateAddressForm
          prevAddress={accountFormValues.addresses}
          user={user}
        />
        <UpdatePasswordForm user={user} />
      </div>
    </div>
  );
};

export default UserAccount;