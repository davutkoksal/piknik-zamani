import React from "react";
import {
  Segment,
  Container,
  Header,
  Button,
  Image,
  Icon,
} from "semantic-ui-react";

export default function MainPage({ history }) {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container>
        <Header as="h2" inverted>
          <Image
            size="massive"
            src="assets/logo.png"
            style={{ marginBottom: 12 }}
          />
          Şimdi piknik yerlerini keşfetme vakti
        </Header>
        <Button onClick={() => history.push("/places")} size="huge" inverted>
          Piknik-Zamanı
          <Icon name="right arrow" inverted />
        </Button>
      </Container>
    </Segment>
  );
}
