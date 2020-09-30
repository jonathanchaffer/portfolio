import { useFormik } from "formik";
import React from "react";
import { Button, Form } from "react-bootstrap";

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export function ContactPage(): JSX.Element {
  const { handleSubmit, values, handleChange } = useFormik<ContactFormValues>({
    initialValues: { email: "", message: "", name: "" },
    onSubmit: vals => {
      alert(JSON.stringify(vals, null, 2));
    },
  });

  return (
    <>
      <h2>Get in Touch</h2>
      <form onSubmit={handleSubmit}>
        <Form.Label>Your Name</Form.Label>
        <Form.Control name="name" onChange={handleChange} />
        <Form.Label>Email Address</Form.Label>
        <Form.Control name="email" onChange={handleChange} />
        <Form.Label>Message</Form.Label>
        <Form.Control name="message" onChange={handleChange} />
        <Button type="submit">Send Message</Button>
      </form>
    </>
  );
}
