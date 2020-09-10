import { Navigation, WorkPage } from "components";
import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export function App(): JSX.Element {
  return (
    <Router>
      <Container>
        <Navigation />
        <Switch>
          <Route exact path="/work">
            <WorkPage />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
