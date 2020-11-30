import * as firebase from "firebase";
import { FormikErrors } from "formik";
import moment from "moment";
import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface ValidatedFormInputProps<I> {
  formik: {
    handleChange: (e: ChangeEvent) => void;
    setFieldValue: (field: string, value: any) => void;
    errors: FormikErrors<I>;
    submitCount: number;
    values: I;
  };
  label?: string;
  field: keyof I;
  textarea?: boolean;
  disabled: boolean;
  type?: "password" | "timestamp";
  rows?: number;
}

export function ValidatedFormInput<I>({
  formik,
  label,
  field,
  textarea,
  disabled,
  type,
  rows,
}: ValidatedFormInputProps<I>): JSX.Element {
  const { handleChange, setFieldValue, errors, submitCount, values } = formik;

  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      {type === "timestamp" ? (
        // TODO: fix timestamp input always being invalid in Safari
        <Form.Control
          disabled={disabled}
          defaultValue={
            values[field]
              ? moment(
                  ((values[field] as unknown) as firebase.firestore.Timestamp).toDate(),
                ).format("MM.DD.YYYY")
              : undefined
          }
          isInvalid={!!errors[field] && !!submitCount}
          onChange={e => {
            const { value } = e.target;
            const convertedValue = moment(value);
            const date = convertedValue.toDate();
            setFieldValue(
              field.toString(),
              convertedValue.isValid() &&
                convertedValue.year() >= 1970 &&
                convertedValue.year() < 3000
                ? firebase.firestore.Timestamp.fromDate(date)
                : undefined,
            );
          }}
        />
      ) : (
        <Form.Control
          name={field.toString()}
          onChange={handleChange}
          isInvalid={!!errors[field] && !!submitCount}
          as={textarea ? "textarea" : undefined}
          rows={rows || 6}
          disabled={disabled}
          type={type}
          value={String(values[field])}
        />
      )}
      <Form.Control.Feedback type="invalid">{errors[field]}</Form.Control.Feedback>
    </Form.Group>
  );
}
