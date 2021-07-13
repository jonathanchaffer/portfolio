import profile from "assets/chaffer_jonathan.png";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./HomePage.scss";

export function HomePage(): JSX.Element {
  const history = useHistory();
  return (
    <div className="center-container">
      <div className="home-page">
        <Row>
          <Col lg={3} sm={4} xs={6}>
            <div className="home-img-container">
              <img alt="Jonathan Chaffer" src={profile} />
            </div>
          </Col>
          <Col className="d-flex align-items-center" md={6} sm={8} xs={12}>
            <div>
              <h1 className="xl">Hi, I&apos;m Jon!</h1>
              <p>
                I&apos;m a software developer and graphic designer based in Grand Rapids, Michigan.
                I currently work as a software consultant and developer at Atomic Object.
              </p>
              <div className="buttons d-flex justify-content-center justify-content-sm-start">
                <Button onClick={() => history.push("/work")} variant="primary">
                  View Portfolio
                </Button>
                <Button onClick={() => history.push("/contact")} variant="outline-secondary">
                  Get in Touch
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
