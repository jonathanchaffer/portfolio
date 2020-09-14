import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./Navigation.scss";

export function Navigation(): JSX.Element {
  return (
    <Navbar expand="md">
      <div className="top">
        <div className="brand">
          <Link to="/">
            <h1>Jonathan Chaffer</h1>
          </Link>
          <span className="caption d-block d-sm-none">Developer & Designer</span>
          <span className="caption d-none d-sm-block">Front-End Developer • Graphic Designer</span>
        </div>
        <Navbar.Toggle>
          <i className="fas fa-bars" />
        </Navbar.Toggle>
      </div>
      <Navbar.Collapse>
        <Link to="/work">Work</Link>
        <a
          href="https://drive.google.com/file/d/1yoMAvKCFBf4CsYXncosY2RueBqanDINf/view?usp=sharing"
          target="blank"
        >
          Resume
        </a>
        <Link to="/contact">Contact</Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
