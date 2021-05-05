import { resumeUrl } from "index";
import React from "react";
import { Col, Row } from "react-bootstrap";

export function UnderConstructionPage(): JSX.Element {
  return (
    <Row className="h-100">
      <Col className="d-flex flex-column align-items-center justify-content-center">
        <h1 className="mb-3">Stay tuned!</h1>
        <p className="text-center">
          This website is currently under construction. In the meantime, feel free to check out my{" "}
          <a href={resumeUrl} target="blank">
            resume
          </a>{" "}
          or{" "}
          <a href="https://github.com/jonathanchaffer" target="blank">
            GitHub profile
          </a>
          .
        </p>
      </Col>
    </Row>
  );
}
