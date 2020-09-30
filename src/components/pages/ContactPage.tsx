import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";
import * as yup from "yup";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

const validationSchema = yup.object<ContactFormValues>({
  email: yup.string().email("Invalid email address.").required("Email is required."),
  message: yup.string().required("Message is required."),
  name: yup.string().required("Name is required."),
});

export function ContactPage(): JSX.Element {
  const { handleSubmit, handleChange, errors, touched } = useFormik<ContactFormValues>({
    initialValues: { email: "", message: "", name: "" },
    onSubmit: vals => {
      alert(JSON.stringify(vals, null, 2));
    },
    validationSchema,
  });

  return (
    <>
      <h2>Get in Touch</h2>
      <form onSubmit={handleSubmit}>
        <Form.Label>Your Name</Form.Label>
        <Form.Control
          name="name"
          onChange={handleChange}
          isInvalid={!!errors.name && touched.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          name="email"
          onChange={handleChange}
          isInvalid={!!errors.email && touched.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        <Form.Label>Message</Form.Label>
        <Form.Control
          name="message"
          onChange={handleChange}
          isInvalid={!!errors.message && touched.message}
        />
        <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
        <Button type="submit">Send Message</Button>
      </form>
    </>
  );
}
