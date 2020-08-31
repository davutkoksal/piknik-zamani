import React from "react";
import { useSelector } from "react-redux";
import { Segment, Header, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function ErrorComponent() {
  const { error } = useSelector((state) => state.async);

  return (
    <Segment placeholder>
      <Header
        textAlign="center"
        content={error?.message || "Bir hata oluştu"}
      />
      <Button
        as={Link}
        to="/places"
        primary
        style={{ marginTop: 20 }}
        content="Ana Sayfaya Dön"
      />
    </Segment>
  );
}
