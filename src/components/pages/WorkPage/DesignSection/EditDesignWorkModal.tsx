import { EditModal, ErrorModal, ValidatedFormInput } from "components";
import { EditWorkModalProps } from "components/reusables/PortfolioControls";
import firebase from "firebase/app";
import { useFormik } from "formik";
import { DesignWork } from "models";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { publishDesignWork, useErrorHandling } from "services";
import * as yup from "yup";
import "./DesignSection.scss";

export interface EditDesignWorkValues extends DesignWork {
  uploadedFiles: File[];
}

export function EditDesignWorkModal({ work, show, onHide }: EditWorkModalProps): JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const { error, handleError } = useErrorHandling();

  const designWork = work as DesignWork;

  const validationSchema = yup.object<EditDesignWorkValues>({
    files: yup.array().of(yup.string().required()).required(),
    id: yup.string(),
    timestamp: yup
      .mixed<firebase.firestore.Timestamp>()
      .required("Timestamp must follow the MM.DD.YYY format."),
    title: yup.string().required("Title is required."),
    uploadedFiles: yup.array().of(yup.object<File>().required()).required(),
  });

  const formik = useFormik<EditDesignWorkValues>({
    initialValues: { ...designWork, uploadedFiles: [] },
    onSubmit: vals => {
      setIsPending(true);
      publishDesignWork(designWork.id, vals)
        .catch(err => handleError(err))
        .finally(() => {
          setIsPending(false);
          onHide();
          window.location.reload();
        });
    },
    validationSchema,
  });

  return (
    <>
      <EditModal
        isPending={isPending}
        onHide={onHide}
        onReset={() => {
          formik.handleReset(formik.values);
        }}
        onSave={() => {
          console.log(formik.values);
          formik.handleSubmit();
        }}
        show={show}
        title="Edit Design Work"
      >
        <form>
          <Row>
            <Col>
              <ValidatedFormInput
                disabled={isPending}
                field="title"
                formik={formik}
                label="Title"
                placeholder="My New Project"
              />
            </Col>
            <Col>
              <ValidatedFormInput
                disabled={isPending}
                field="timestamp"
                formik={formik}
                label="Timestamp"
                placeholder="MM.DD.YYYY"
                type="timestamp"
              />
            </Col>
          </Row>
        </form>
      </EditModal>
      <ErrorModal error={error} />
    </>
  );
}
