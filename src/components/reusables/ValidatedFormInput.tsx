import * as firebase from "firebase";
import { FormikErrors } from "formik";
import moment from "moment";
import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

// TODO: add placeholder prop
interface ValidatedFormInputProps<I> {
  formik: {
    handleChange: (e: ChangeEvent) => void;
    setFieldValue: (
      field: string,
      value: string | firebase.firestore.Timestamp | undefined,
    ) => void;
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
  placeholder?: string;
}

export function ValidatedFormInput<I>({
  formik,
  label,
  field,
  textarea,
  disabled,
  type,
  rows,
  placeholder,
}: ValidatedFormInputProps<I>): JSX.Element {
  const { handleChange, setFieldValue, errors, submitCount, values } = formik;

  return (
    <Form.Group>
      {label && <Form.Label>{label}</Form.Label>}
      {type === "timestamp" ? (
        <Form.Control
          defaultValue={
            values[field]
              ? moment(
                  ((values[field] as unknown) as firebase.firestore.Timestamp).toDate(),
                ).format("MM.DD.YYYY")
              : undefined
          }
          disabled={disabled}
          isInvalid={!!errors[field] && !!submitCount}
          onChange={e => {
            const { value } = e.target;
            const convertedValue = moment(value, "MM.DD.YYYY");
            const date = convertedValue.toDate();
            let newTimestamp: firebase.firestore.Timestamp | undefined;
            if (
              convertedValue.isValid() &&
              convertedValue.year() >= 1970 &&
              convertedValue.year() < 3000
            )
              newTimestamp = firebase.firestore.Timestamp.fromDate(date);
            setFieldValue(field.toString(), newTimestamp);
          }}
          placeholder={placeholder}
        />
      ) : (
        <Form.Control
          as={textarea ? "textarea" : undefined}
          disabled={disabled}
          isInvalid={!!errors[field] && !!submitCount}
          name={field.toString()}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows || 6}
          type={type}
          value={String(values[field])}
        />
      )}
      <Form.Control.Feedback type="invalid">{errors[field]}</Form.Control.Feedback>
    </Form.Group>
  );
}
