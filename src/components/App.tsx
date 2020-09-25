import { Navigation, WorkPage } from "components";
import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UnderConstructionPage } from "./pages/UnderConstructionPage";

export function App(): JSX.Element {
  const underConstruction = true;

  return (
    <Router>
      <Container>
        {underConstruction ? (
          <UnderConstructionPage />
        ) : (
          <>
            <Navigation />
            <Switch>
              <Route exact path="/work">
                <WorkPage />
              </Route>
            </Switch>
          </>
        )}
      </Container>
    </Router>
  );
}
