import React from "react";
import { Menu, Container, Responsive } from "semantic-ui-react";
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
      <Responsive as={Menu} inverted fixed="top" minWidth={768}>
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
      </Responsive>
      <Responsive inverted as={Menu} maxWidth={768} stackable>
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
      </Responsive>
    </>
  );
}
