import React from "react";
import { Menu, Image, Dropdown } from "semantic-ui-react";
import { useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signOutFirebase } from "../firestore/firebaseService";
import { useSelector } from "react-redux";

export default function SignedInMenu() {
  const { currentUserProfile } = useSelector((state) => state.profile);
  const history = useHistory();
  async function handleSignOut() {
    try {
      await signOutFirebase();
      history.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Menu.Item position="right">
      <Image
        avatar
        spaced="right"
        src={currentUserProfile?.photoURL || "/assets/user.png"}
      />

      <Dropdown pointing="top left" text={currentUserProfile?.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item
            text="Profilim"
            icon="user"
            as={Link}
            to={`/profile/${currentUserProfile?.id}`}
          />
          <Dropdown.Item
            text="Hesap Ayarları"
            icon="settings"
            as={Link}
            to="/account"
          />
          <Dropdown.Item text="Çıkış" icon="power" onClick={handleSignOut} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
}
