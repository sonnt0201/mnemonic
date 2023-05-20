import { Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth, signOutApp, useUser } from "../../account";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AccountInfor = () => {
  const [user] = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/mnemonic/signin");
  },[]);

  return (
    <>
      <h1>this is AccountInfor</h1>
      <h2> {(user) ? user.email : ""}</h2>
      <Button
        className="log-out"
        onClick={() => {
          signOutApp().then(() => {
            
            navigate("/mnemonic/signin");
          });
        }}
      >
        Đăng xuất
      </Button>
    </>
  );
};
