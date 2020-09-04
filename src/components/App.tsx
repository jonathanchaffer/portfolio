import { Navigation } from "components";
import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router } from "react-router-dom";

export function App(): JSX.Element {
  return (
    <Router>
      <Container>
        <Navigation />
      </Container>
    </Router>
  );
}
