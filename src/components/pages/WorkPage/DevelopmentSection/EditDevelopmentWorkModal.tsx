import { EditModal, ErrorModal, FileUploader, ValidatedFormInput } from "components";
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

interface EditDevelopmentWorkValues extends DevelopmentWork {
  uploadedFile: File | undefined;
}

export function EditDevelopmentWorkModal({
  work,
  show,
  onHide,
}: EditDevelopmentWorkModalProps): JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const [thumbnailURL, setThumbnailURL] = useState<string | undefined>(undefined);
  const [previewURL, setPreviewURL] = useState<string | undefined>(undefined);
  const [isShowingFileUpload, setIsShowingFileUpload] = useState(false);
  const { error, handleError } = useErrorHandling();

  const validationSchema = yup.object<EditDevelopmentWorkValues>({
    description: yup.string().required("Description is required."),
    id: yup.string().required(),
    links: yup.object<Record<LinkType, string>>().required(),
    thumbnail: yup.string().required(),
    timestamp: yup.object<firebase.firestore.Timestamp>().required(),
    title: yup.string().required("Title is required."),
    uploadedFile: yup.mixed(),
  });

  const formik = useFormik<EditDevelopmentWorkValues>({
    initialValues: { ...work, uploadedFile: undefined },
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
        onReset={() => {
          formik.handleReset(formik.values);
          setIsShowingFileUpload(false);
          setPreviewURL(undefined);
        }}
        isPending={isPending}
      >
        <form>
          <Row>
            <Col>
              <ValidatedFormInput
                formik={formik}
                label="Title &amp; Timestamp"
                field="title"
                disabled={isPending}
              />
              <ValidatedFormInput formik={formik} field="timestamp" disabled={isPending} />
            </Col>
            <Col xs={12} lg="auto">
              <Form.Group>
                <Form.Label>Thumbnail</Form.Label>
                {isShowingFileUpload ? (
                  <FileUploader
                    fileType="image"
                    onUpload={file => {
                      formik.setFieldValue("uploadedFile", file);
                      setPreviewURL(URL.createObjectURL(file));
                      setIsShowingFileUpload(false);
                    }}
                  />
                ) : (
                  <Row>
                    <Col xs="auto">
                      <div className="img-container">
                        <img src={previewURL || thumbnailURL} alt={work.title} />
                      </div>
                    </Col>
                    <Col>
                      <p>{formik.values.uploadedFile?.name || work.thumbnail}</p>
                      <Button
                        variant="outline-secondary"
                        onClick={() => setIsShowingFileUpload(true)}
                      >
                        Replace
                      </Button>
                    </Col>
                  </Row>
                )}
                {/* TODO: show warning when no thumbnail is added */}
                <div className="invalid-feedback d-block">{formik.errors.uploadedFile}</div>
              </Form.Group>
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
                rows={3}
              />
            </Col>
          </Row>
        </form>
      </EditModal>
      <ErrorModal error={error} />
    </>
  );
}
