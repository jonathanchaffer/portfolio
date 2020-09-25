import profile from "assets/profile.jpg";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HomePage.scss";

export function HomePage(): JSX.Element {
  return (
    <div className="home-page">
      <Row>
        <Col xs={4} md={3}>
          <img src={profile} alt="Jonathan Chaffer" />
        </Col>
        <Col xs={8} md={6} className="d-flex align-items-center">
          <div>
            <h1 className="mb-3">Hi, I&apos;m Jon!</h1>
            <p>
              I&apos;m a software developer and graphic designer based in Grand Rapids, Michigan.
              Feel free to check out my <Link to="/work">work</Link> or{" "}
              <Link to="/contact">get in touch</Link>!
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
