import {
  ContactPage,
  Footer,
  HomePage,
  Navigation,
  UnderConstructionPage,
  WorkPage,
} from "components";
import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { AdminLoginPage } from "./pages";

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
            <main>
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route exact path="/work">
                  <WorkPage />
                </Route>
                <Route exact path="/contact">
                  <ContactPage />
                </Route>
                <Route exact path="/admin">
                  <AdminLoginPage />
                </Route>
                <Route>
                  <Redirect to="/" />
                </Route>
              </Switch>
            </main>
            <Footer />
          </>
        )}
      </Container>
    </Router>
  );
}
