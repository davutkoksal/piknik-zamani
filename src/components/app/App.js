import React from "react";
import NavBar from "../nav/NavBar";
import { Container } from "semantic-ui-react";
import PlaceDashboard from "../places/placeDashboard/PlaceDashboard";
import HomePage from "../home/HomePage";
import PlaceDetailsPage from "../places/placeDetails/PlaceDetailsPage";
import { Route } from "react-router-dom";
import PlaceForm from "../places/placeForm/PlaceForm";
import MainPage from "../mainPage/MainPage";
import EventDashboard from "../events/eventDashboard/EventDashboard";
import EventDetailsPage from "../events/eventDetails/EventDetailsPage";
import ModalManager from "../common/modal/ModalManager";
import { ToastContainer } from "react-toastify";
import ErrorComponent from "../common/ErrorComponent";
import EventForm from "../events/eventForm/EventForm";
import AccountPage from "../auth/AccountPage";
import { useSelector } from "react-redux";
import LoadingComponent from "../common/LoadingComponent";
import ProfilePage from "../profiles/profilePage/ProfilePage";
import EventUpdateForm from "../events/eventForm/EventUpdateForm";
function App() {
  const { initialized } = useSelector((state) => state.async);
  if (!initialized) return <LoadingComponent content="Yükleniyor..." />;

  return (
    <div>
      <Route exact path="/" component={MainPage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <ModalManager />
            <ToastContainer position="bottom-right" hideProgressBar />
            <NavBar />
            <Container className="main">
              <Route exact path="/homepage" component={HomePage} />
              <Route exact path="/places" component={PlaceDashboard} />
              <Route path="/places/:id" component={PlaceDetailsPage} />
              <Route path="/createPlace" component={PlaceForm} />
              <Route exact path="/events" component={EventDashboard} />
              <Route path="/events/:id" component={EventDetailsPage} />
              <Route path="/createEvent/:id" component={EventForm} />
              <Route path="/updateEvent/:id" component={EventUpdateForm} />
              <Route exact path="/account" component={AccountPage} />
              <Route exact path="/profile/:id" component={ProfilePage} />
              <Route exact path="/error" component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </div>
  );
}

export default App;
