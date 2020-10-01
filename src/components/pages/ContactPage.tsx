import { InfoModal } from "components";
import emailjs from "emailjs-com";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
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

  const { handleSubmit, handleChange, errors, touched } = useFormik<ContactFormValues>({
    initialValues: { email: "", message: "", name: "", subject: "" },
    onSubmit: vals => {
      setIsSending(true);
      emailjs.init("user_NvveBpUvnob0kLD1l2GEg");
      emailjs
        .send("service_p9bvi17", "template_78d14b7", vals)
        .catch(error => alert(error.message))
        .finally(() => {
          setIsSending(false);
          setIsShowingConfirmationModal(true);
        });
    },
    validationSchema,
  });

  return (
    <>
      <h2>Get in Touch</h2>
      <br />
      <form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6}>
            <ContactFormInput
              label="Your Name"
              field="name"
              handleChange={handleChange}
              errors={errors}
              touched={touched}
              disabled={isSending}
            />
          </Col>
          <Col sm={6}>
            <ContactFormInput
              label="Email Address"
              field="email"
              handleChange={handleChange}
              errors={errors}
              touched={touched}
              disabled={isSending}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ContactFormInput
              label="Subject"
              field="subject"
              handleChange={handleChange}
              errors={errors}
              touched={touched}
              disabled={isSending}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <ContactFormInput
              label="Message"
              field="message"
              handleChange={handleChange}
              errors={errors}
              touched={touched}
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
      <InfoModal
        title="Success"
        message="Your message has been sent."
        show={isShowingConfirmationModal}
        onHide={() => setIsShowingConfirmationModal(false)}
      />
    </>
  );
}

interface ContactFormInputProps {
  handleChange: any;
  errors: FormikErrors<ContactFormValues>;
  touched: FormikTouched<ContactFormValues>;
  label: string;
  field: keyof ContactFormValues;
  textarea?: boolean;
  disabled: boolean;
}

function ContactFormInput({
  handleChange,
  errors,
  touched,
  label,
  field,
  textarea,
  disabled,
}: ContactFormInputProps): JSX.Element {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={field}
        onChange={handleChange}
        isInvalid={!!errors[field] && touched[field]}
        as={textarea ? "textarea" : undefined}
        rows={6}
        disabled={disabled}
      />
      <Form.Control.Feedback type="invalid">{errors[field]}</Form.Control.Feedback>
    </Form.Group>
  );
}
