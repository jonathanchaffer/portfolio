import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.scss";

export function Navigation(): JSX.Element {
  return (
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
  );
}
