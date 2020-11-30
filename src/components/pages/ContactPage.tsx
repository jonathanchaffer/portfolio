import { ErrorModal, InfoModal, ValidatedFormInput } from "components";
import emailjs from "emailjs-com";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useErrorHandling } from "services";
import * as yup from "yup";

interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const validationSchema = yup.object<ContactFormValues>({
  email: yup.string().email("Invalid email address.").required("Email is required."),
  message: yup.string().required("Message is required."),
  name: yup.string().required("Name is required."),
  subject: yup.string().required("Subject is required."),
});

export function ContactPage(): JSX.Element {
  const [isSending, setIsSending] = useState(false);
  const [isShowingConfirmationModal, setIsShowingConfirmationModal] = useState(false);
  const { error, handleError } = useErrorHandling();

  const formik = useFormik<ContactFormValues>({
    initialValues: { email: "", message: "", name: "", subject: "" },
    onSubmit: vals => {
      setIsSending(true);
      emailjs.init("user_NvveBpUvnob0kLD1l2GEg");
      emailjs
        .send("service_p9bvi17", "template_78d14b7", vals)
        .catch(err => handleError(err))
        .finally(() => {
          setIsSending(false);
          setIsShowingConfirmationModal(true);
        });
    },
    validationSchema,
  });

  return (
    <>
      <div className="center-container">
        <div>
          <Row>
            <Col>
              <h2>Get in Touch</h2>
              <br />
              <form onSubmit={formik.handleSubmit}>
                <Row>
                  <Col sm={6}>
                    <ValidatedFormInput
                      formik={formik}
                      label="Your Name"
                      field="name"
                      disabled={isSending}
                    />
                  </Col>
                  <Col sm={6}>
                    <ValidatedFormInput
                      formik={formik}
                      label="Email Address"
                      field="email"
                      disabled={isSending}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ValidatedFormInput
                      formik={formik}
                      label="Subject"
                      field="subject"
                      disabled={isSending}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ValidatedFormInput
                      formik={formik}
                      label="Message"
                      field="message"
                      textarea
                      disabled={isSending}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button type="submit" disabled={isSending}>
                      Send Message
                    </Button>
                  </Col>
                </Row>
              </form>
            </Col>
          </Row>
        </div>
      </div>
      <InfoModal
        title="Success"
        message="Your message has been sent."
        show={isShowingConfirmationModal}
        onHide={() => setIsShowingConfirmationModal(false)}
      />
      <ErrorModal error={error} />
    </>
  );
}
