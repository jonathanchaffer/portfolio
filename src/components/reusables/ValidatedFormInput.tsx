import { FormikErrors, FormikTouched } from "formik";
import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface ValidatedFormInputProps<I> {
  formik: {
    handleChange: (e: ChangeEvent) => void;
    errors: FormikErrors<I>;
    touched: FormikTouched<I>;
    values: I;
  };
  label: string;
  field: keyof I;
  textarea?: boolean;
  disabled: boolean;
  type?: "password";
}

export function ValidatedFormInput<I>({
  formik,
  label,
  field,
  textarea,
  disabled,
  type,
}: ValidatedFormInputProps<I>): JSX.Element {
  const { handleChange, errors, touched, values } = formik;

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
        value={String(values[field])}
      />
      <Form.Control.Feedback type="invalid">{errors[field]}</Form.Control.Feedback>
    </Form.Group>
  );
}
