import profile from "assets/profile-512.png";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./HomePage.scss";

export function HomePage(): JSX.Element {
  const history = useHistory();
  return (
    <div className="home-page">
      <Row>
        <Col xs={6} sm={4} lg={3}>
          <div className="home-img-container">
            <img src={profile} alt="Jonathan Chaffer" />
          </div>
        </Col>
        <Col xs={12} sm={8} md={6} className="d-flex align-items-center">
          <div>
            <h1 className="xl">Hi, I&apos;m Jon!</h1>
            <p>
              I&apos;m a software developer and graphic designer based in Grand Rapids, Michigan. I
              have skills in various areas, but am especially interested in front-end development
              and UI/UX design.
            </p>
            <div className="buttons">
              <Button variant="primary" onClick={() => history.push("/work")}>
                View Portfolio
              </Button>
              <Button variant="outline-secondary" onClick={() => history.push("/contact")}>
                Get in Touch
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
