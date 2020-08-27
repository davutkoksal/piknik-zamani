import React from "react";
import { Segment, Image, Button, Grid, Icon } from "semantic-ui-react";
import { Formik, Form } from "formik";
import TextInput from "../common/form/TextInput";
import TextArea from "../common/form/TextArea";
import * as Yup from "yup";

export default function HomePage() {
  const initialValues = { name: "", email: "", comment: "" };
  return (
    <>
      <Segment.Group>
        <Segment basic attached="top" style={{ padding: "0" }}>
          <Image
            fluid
            src={"/assets/picnic.jpg"}
            style={{
              width: "100%",
              height: "50vh",
              objectFit: "cover",
            }}
            bordered
          />
        </Segment>
        <Segment>
          <p>
            Türkiye’de piknik ve doğa sporları yapılabilecek tüm yerleri güncel
            şekilde doğa severlerle paylaşıyoruz. Böylece doğa severlere yeni
            yerler keşfetmelerinde, etkinlikler düzenlemelerinde ve birbirleri
            ile tanışmalarında yardımcı oluyoruz.
          </p>
        </Segment>
      </Segment.Group>
      <Segment>
        <h3>Bize Ulaşın</h3>
        <Formik
          initialValues={initialValues}
          validationSchema={Yup.object({
            name: Yup.string().required("İsim giriniz!"),
            email: Yup.string()
              .required("Geçerli bir email adresi giriniz!")
              .email(),
            comment: Yup.string().required("Görüşlerinizi yazınız!").email(),
          })}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form className="ui form">
            <TextInput name="name" placeholder="İsim" autoComplete="off" />
            <TextInput name="email" placeholder="Email" autoComplete="off" />
            <TextArea
              name="comment"
              placeholder="Mesajınız"
              rows="3"
              autoComplete="off"
            />
            <Button type="submit" content="Gönder" primary />
          </Form>
        </Formik>
      </Segment>
      <Segment>
        <Grid stackable>
          <Grid.Column width={10}>
            <span>
              Developed by{" "}
              <a href="https://davutkoksal.github.io">Davut Köksal</a>
            </span>
          </Grid.Column>
          <Grid.Column width={6} floated="right">
            <a href="https://github.com/davutkoksal">
              <Icon name="github" size="large" />
            </a>
            <a href="https://www.linkedin.com/in/davut-koksal-30538a1b4/">
              <Icon name="linkedin" size="large" />
            </a>
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  );
}
