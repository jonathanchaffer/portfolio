import { EditModal, ErrorModal, ValidatedFormInput } from "components";
import * as firebase from "firebase";
import { useFormik } from "formik";
import { DevelopmentWork, LinkType } from "models";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { getDevelopmentThumbnailURL, updateDevelopmentWork, useErrorHandling } from "services";
import * as yup from "yup";
import "./DevelopmentSection.scss";

interface EditDevelopmentWorkModalProps {
  work: DevelopmentWork;
  show: boolean;
  onHide: () => void;
}

export function EditDevelopmentWorkModal({
  work,
  show,
  onHide,
}: EditDevelopmentWorkModalProps): JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const [thumbnailURL, setThumbnailURL] = useState<string | undefined>(undefined);
  const { error, handleError } = useErrorHandling();

  const validationSchema = yup.object<DevelopmentWork>({
    description: yup.string().required("Description is required."),
    id: yup.string().required(),
    links: yup.object<Record<LinkType, string>>().required(),
    thumbnail: yup.string().required("Thumbnail is required."),
    timestamp: yup.object<firebase.firestore.Timestamp>().required(),
    title: yup.string().required("Title is required."),
  });

  const formik = useFormik<DevelopmentWork>({
    initialValues: work,
    onSubmit: vals => {
      setIsPending(true);
      updateDevelopmentWork(work.id, vals)
        .catch(err => handleError(err))
        .finally(() => {
          setIsPending(false);
          onHide();
          window.location.reload();
        });
    },
    validationSchema,
  });

  useEffect(() => {
    getDevelopmentThumbnailURL(work)
      .then(url => setThumbnailURL(url))
      .catch(err => handleError(err));
  });

  return (
    <>
      <EditModal
        title="Edit Development Work"
        show={show}
        onHide={onHide}
        onSave={formik.handleSubmit}
        isPending={isPending}
      >
        <form>
          <Row>
            <Col>
              <Form.Label>Thumbnail</Form.Label>
              <Row>
                <Col xs="auto">
                  <div className="img-container">
                    <img src={thumbnailURL} alt={work.title} />
                  </div>
                </Col>
                <Col>
                  {work.thumbnail ? (
                    <>
                      <p>{work.thumbnail}</p>
                      <Button variant="outline-danger">Remove</Button>
                    </>
                  ) : (
                    <>
                      <p>No image uploaded</p>
                      <Button variant="outline-secondary">Upload</Button>
                    </>
                  )}
                </Col>
              </Row>
              {/* TODO: show warning when no thumbnail is added */}
            </Col>
          </Row>
          <Row>
            <Col>
              <ValidatedFormInput
                formik={formik}
                label="Title"
                field="title"
                disabled={isPending}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <ValidatedFormInput
                formik={formik}
                label="Description"
                field="description"
                disabled={isPending}
                textarea
              />
            </Col>
          </Row>
        </form>
      </EditModal>
      <ErrorModal error={error} />
    </>
  );
}
