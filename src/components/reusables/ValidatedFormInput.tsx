import { FormikErrors, FormikTouched } from "formik";
import React from "react";
import { Form } from "react-bootstrap";

interface ValidatedFormInputProps<I> {
  handleChange: any;
  errors: FormikErrors<I>;
  touched: FormikTouched<I>;
  label: string;
  field: keyof I;
  textarea?: boolean;
  disabled: boolean;
  type?: "password";
}

export function ValidatedFormInput<I>({
  handleChange,
  errors,
  touched,
  label,
  field,
  textarea,
  disabled,
  type,
}: ValidatedFormInputProps<I>): JSX.Element {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        name={field.toString()}
        onChange={handleChange}
        isInvalid={!!errors[field] && !!touched[field]}
        as={textarea ? "textarea" : undefined}
        rows={6}
        disabled={disabled}
        type={type}
      />
      <Form.Control.Feedback type="invalid">{errors[field]}</Form.Control.Feedback>
    </Form.Group>
  );
}
