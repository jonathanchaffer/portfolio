import React from "react";
import { Spinner } from "react-bootstrap";
import "./SpinnerContainer.scss";

export function SpinnerContainer(): JSX.Element {
  return (
    <div className="spinner-container">
      <Spinner animation="border" size="sm" />
    </div>
  );
}
