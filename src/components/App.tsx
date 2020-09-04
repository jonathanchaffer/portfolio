import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Link } from "react-router-dom";

export function App(): JSX.Element {
  return (
    <Router>
      <Container>
        <nav>
          <Link to="/">
            <h1>Jonathan Chaffer</h1>
          </Link>
          <div>
            <Link to="/work">Work</Link>
            <Link to="/resume">Resume</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>
      </Container>
    </Router>
  );
}
