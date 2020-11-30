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
                      disabled={isSending}
                      field="name"
                      formik={formik}
                      label="Your Name"
                    />
                  </Col>
                  <Col sm={6}>
                    <ValidatedFormInput
                      disabled={isSending}
                      field="email"
                      formik={formik}
                      label="Email Address"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ValidatedFormInput
                      disabled={isSending}
                      field="subject"
                      formik={formik}
                      label="Subject"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <ValidatedFormInput
                      disabled={isSending}
                      field="message"
                      formik={formik}
                      label="Message"
                      textarea
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button disabled={isSending} type="submit">
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
        message="Your message has been sent."
        onHide={() => setIsShowingConfirmationModal(false)}
        show={isShowingConfirmationModal}
        title="Success"
      />
      <ErrorModal error={error} />
    </>
  );
}
