import { ErrorModal, ValidatedFormInput } from "components";
import { useFormik } from "formik";
import React, { useCallback, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { login, useErrorHandling } from "services";
import * as yup from "yup";

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = yup.object<LoginFormValues>({
  email: yup.string().email("Invalid email address.").required("Email is required."),
  password: yup.string().required("Password is required."),
});

export function AdminLoginPage(): JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const { error, handleError } = useErrorHandling();
  const history = useHistory();

  const submitForm = useCallback(
    (vals: LoginFormValues) => {
      let isCurrent = true;
      setIsPending(true);
      login(vals.email, vals.password)
        .then(() => {
          if (isCurrent) history.push("/");
        })
        .catch(err => {
          if (isCurrent) handleError(err);
        })
        .finally(() => {
          if (isCurrent) setIsPending(false);
        });
      return () => {
        isCurrent = false;
      };
    },
    [handleError, history],
  );

  const { handleSubmit, handleChange, errors, touched } = useFormik<LoginFormValues>({
    initialValues: { email: "", password: "" },
    onSubmit: vals => {
      submitForm(vals);
    },
    validationSchema,
  });

  return (
    <>
      <div className="center-container">
        <div>
          <Row className="d-flex justify-content-center">
            <Col xs={12} sm={8} md={6}>
              <h2>Admin Login</h2>
              <br />
              <form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <ValidatedFormInput
                      label="Email"
                      field="email"
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                      disabled={isPending}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ValidatedFormInput
                      label="Password"
                      field="password"
                      handleChange={handleChange}
                      errors={errors}
                      touched={touched}
                      disabled={isPending}
                      type="password"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button type="submit" disabled={isPending}>
                      Log In
                    </Button>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </div>
      </div>
      <ErrorModal error={error} />
    </>
  );
}
