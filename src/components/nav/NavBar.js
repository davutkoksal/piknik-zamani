import React from "react";
import { Menu, Container } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import SignedOutMenu from "./SignedOutMenu";
import SignedInMenu from "./SignedInMenu";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../common/modal/ModalReducer";

export default function NavBar() {
  const { authenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <>
      <Menu inverted fixed="top" stackable>
        <Container>
          <Menu.Item as={NavLink} exact to="/homepage">
            <img
              src="/assets/logo.png"
              alt="logo"
              style={{ marginRight: "0.5rem" }}
            />
            Piknik-Zamanı
          </Menu.Item>
          <Menu.Item as={NavLink} to="/places">
            Piknik Yerleri
          </Menu.Item>
          {authenticated ? (
            <Menu.Item as={NavLink} to="/events">
              Piknik Organizasyonları
            </Menu.Item>
          ) : (
            <Menu.Item
              onClick={() => dispatch(openModal({ modalType: "UnAuthModal" }))}
            >
              Piknik Organizasyonları
            </Menu.Item>
          )}
          {authenticated ? <SignedInMenu /> : <SignedOutMenu />}
        </Container>
      </Menu>
    </>
  );
}
