import { Navigation, UnderConstructionPage, WorkPage } from "components";
import React from "react";
import Container from "react-bootstrap/Container";
import Fader from "react-fader";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import TransitionSwitch from "react-router-transition-switch";

export function App(): JSX.Element {
  const underConstruction = false;

  return (
    <Router>
      <Container>
        {underConstruction ? (
          <UnderConstructionPage />
        ) : (
          <>
            <Navigation />
            <TransitionSwitch component={Fader}>
              <Route exact path="/work">
                <WorkPage />
              </Route>
              <Route>
                <Redirect to="/" />
              </Route>
            </TransitionSwitch>
          </>
        )}
      </Container>
    </Router>
  );
}
