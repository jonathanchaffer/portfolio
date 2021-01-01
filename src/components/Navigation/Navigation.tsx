import { ErrorModal } from "components";
import { UserContext } from "contexts";
import React, { useCallback, useContext } from "react";
import { Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import { logout, useErrorHandling } from "services";
import "./Navigation.scss";

export function Navigation(): JSX.Element {
  const user = useContext(UserContext);
  const { error, handleError } = useErrorHandling();

  const handleLogout = useCallback(() => {
    let isCurrent = true;

    logout().catch(err => {
      if (isCurrent) handleError(err);
    });

    return () => {
      isCurrent = false;
    };
  }, [handleError]);

  return (
    <>
      <Navbar expand="md">
        <div className="top">
          <div className="brand">
            <Link to="/">
              <h1>Jonathan Chaffer</h1>
            </Link>
            <span className="caption d-block d-sm-none">Developer & Designer</span>
            <span className="caption d-none d-sm-block">Software Developer • Graphic Designer</span>
          </div>
          <Navbar.Toggle>
            <i className="fas fa-bars" />
          </Navbar.Toggle>
        </div>
        <Navbar.Collapse>
          <NavLink to="/work">Work</NavLink>
          <a
            href="https://drive.google.com/file/d/1yoMAvKCFBf4CsYXncosY2RueBqanDINf/view?usp=sharing"
            target="blank"
          >
            Resume
          </a>
          <NavLink to="/contact">Contact</NavLink>
          {user && <Button onClick={handleLogout}>Log Out</Button>}
        </Navbar.Collapse>
      </Navbar>
      <ErrorModal error={error} />
    </>
  );
}

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

function NavLink({ to, children }: NavLinkProps): JSX.Element {
  const { pathname } = useLocation();

  return (
    <Link className={pathname === to ? "active" : ""} to={to}>
      {children}
    </Link>
  );
}
