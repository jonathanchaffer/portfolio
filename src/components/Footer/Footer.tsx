import React from "react";
import { Nav } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "./Footer.scss";

export function Footer(): JSX.Element {
  const year = new Date().getFullYear();
  return (
    <Navbar className="footer">
      <div>
        <span className="caption">Copyright © {year} Jonathan Chaffer</span>
      </div>
      <Nav>
        <a href="https://github.com/jonathanchaffer" target="blank">
          <i className="fab fa-github" />
        </a>
        <a href="https://www.linkedin.com/in/jonathan-chaffer/" target="blank">
          <i className="fab fa-linkedin" />
        </a>
      </Nav>
    </Navbar>
  );
}
