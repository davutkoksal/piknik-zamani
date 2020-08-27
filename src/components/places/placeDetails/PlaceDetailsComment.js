import React from "react";
import { Segment, Button, Header, Comment } from "semantic-ui-react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextArea from "../../common/form/TextArea";
import { toast } from "react-toastify";
import {
  addPlaceComment,
  getPlaceChatRef,
} from "../../firestore/firebaseService";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { listenToPlaceChat } from "../actions/PlaceActions";
import { CLEAR_COMMENTS } from "../actions/PlaceActions";

export default function PlaceDetailsComment({ placeId }) {
  const { authenticated } = useSelector((state) => state.auth);
  const initialValues = { comment: "" };
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.places);

  useEffect(
    () =>
      getPlaceChatRef(placeId).on("value", (snapshot) => {
        if (!snapshot) return;
        const chatObject =
          snapshot.val() &&
          Object.entries(snapshot.val()).map((e) =>
            Object.assign({}, e[1], { id: e[0] })
          );
        dispatch(listenToPlaceChat(chatObject));

        return () => {
          dispatch({ type: CLEAR_COMMENTS });
          getPlaceChatRef().off();
        };
      }),
    [placeId, dispatch]
  );

  const validationSchema = Yup.object({
    comment: Yup.string().required("Bu alanı boş bırakamazsınız"),
  });
  return (
    <>
      {comments && comments.length > 0 && (
        <Segment.Group>
          <Segment
            textAlign="center"
            attached="top"
            inverted
            color="teal"
            style={{ border: "none" }}
          >
            <Header>Yorumlar</Header>
          </Segment>
          <Segment>
            <Comment.Group>
              {comments.map((comment) => (
                <Comment key={comment.id}>
                  <Comment.Avatar src={comment.photoURL} />
                  <Comment.Content>
                    <Comment.Author>{comment.displayName}</Comment.Author>
                    <Comment.Text>{comment.text}</Comment.Text>
                  </Comment.Content>
                </Comment>
              ))}
            </Comment.Group>
          </Segment>
        </Segment.Group>
      )}
      <Segment.Group>
        <Segment
          textAlign="center"
          attached="top"
          inverted
          color="teal"
          style={{ border: "none" }}
        >
          <Header>
            {authenticated ? "Yorum Ekle" : "Yorum Eklemek İçin Giriş Yapın"}
          </Header>
        </Segment>
        {authenticated && (
          <Segment>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  await addPlaceComment(placeId, values.comment);
                  resetForm();
                } catch (error) {
                  toast.error(error.message);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isValid, isSubmitting, dirty }) => (
                <Form className="ui form">
                  <TextArea
                    name="comment"
                    placeholder="Piknik Yeri Hakkındadaki Yorumlarınızı Yazınız"
                  />
                  <Button
                    loading={isSubmitting}
                    disabled={isSubmitting || !isValid || !dirty}
                    type="submit"
                    icon="edit"
                    content="Gönder"
                    primary
                  />
                </Form>
              )}
            </Formik>
          </Segment>
        )}
      </Segment.Group>
    </>
  );
}
