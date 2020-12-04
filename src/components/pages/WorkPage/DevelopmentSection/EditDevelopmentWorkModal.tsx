import { EditModal, ErrorModal, FileUploader, ValidatedFormInput } from "components";
import { EditWorkModalProps } from "components/reusables/PortfolioControls";
import firebase from "firebase/app";
import { useFormik } from "formik";
import { DevelopmentWork, LinkType } from "models";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { getDevelopmentThumbnailURL, publishDevelopmentWork, useErrorHandling } from "services";
import * as yup from "yup";
import "./DevelopmentSection.scss";

export interface EditDevelopmentWorkValues extends DevelopmentWork {
  uploadedFile: File | undefined;
}

export function EditDevelopmentWorkModal({ work, show, onHide }: EditWorkModalProps): JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const [thumbnailURL, setThumbnailURL] = useState<string | undefined>(undefined);
  const [previewURL, setPreviewURL] = useState<string | undefined>(undefined);
  const [isShowingFileUpload, setIsShowingFileUpload] = useState(!work.thumbnail);
  const { error, handleError } = useErrorHandling();

  const devWork = work as DevelopmentWork;

  const validationSchema = yup.object<EditDevelopmentWorkValues>({
    description: yup.string().required("Description is required."),
    id: yup.string(),
    links: yup.object<Record<LinkType, string>>().required(),
    thumbnail: yup.string().required("Thumbnail is required."),
    timestamp: yup
      .mixed<firebase.firestore.Timestamp>()
      .required("Timestamp must follow the MM.DD.YYY format."),
    title: yup.string().required("Title is required."),
    uploadedFile: yup.mixed(),
  });

  const formik = useFormik<EditDevelopmentWorkValues>({
    initialValues: { ...devWork, uploadedFile: undefined },
    onSubmit: vals => {
      setIsPending(true);
      publishDevelopmentWork(work.id, vals)
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
    let isCurrent = true;

    getDevelopmentThumbnailURL(devWork)
      .then(url => {
        if (isCurrent) setThumbnailURL(url);
      })
      .catch(err => {
        if (isCurrent) handleError(err);
      });

    return () => {
      isCurrent = false;
    };
  });

  return (
    <>
      <EditModal
        isPending={isPending}
        onHide={onHide}
        onReset={() => {
          formik.handleReset(formik.values);
          setIsShowingFileUpload(false);
          setPreviewURL(undefined);
        }}
        onSave={formik.handleSubmit}
        show={show}
        title="Edit Development Work"
      >
        <form>
          <Row>
            <Col>
              <ValidatedFormInput
                disabled={isPending}
                field="title"
                formik={formik}
                label="Title &amp; Timestamp"
                placeholder="My New Project"
              />
              <ValidatedFormInput
                disabled={isPending}
                field="timestamp"
                formik={formik}
                placeholder="MM.DD.YYYY"
                type="timestamp"
              />
            </Col>
            <Col lg="auto" xs={12}>
              <Form.Group>
                <Form.Label>Thumbnail</Form.Label>
                {isShowingFileUpload ? (
                  <FileUploader
                    fileType="image"
                    onUpload={file => {
                      formik.setFieldValue("uploadedFile", file);
                      formik.setFieldValue("thumbnail", file.name);
                      setPreviewURL(URL.createObjectURL(file));
                      setIsShowingFileUpload(false);
                    }}
                  />
                ) : (
                  <Row>
                    <Col xs="auto">
                      <div className="img-container">
                        <img alt={work.title} src={previewURL || thumbnailURL} />
                      </div>
                    </Col>
                    <Col>
                      <p>{formik.values.uploadedFile?.name || work.thumbnail}</p>
                      <Button
                        disabled={isPending}
                        onClick={() => setIsShowingFileUpload(true)}
                        variant="outline-secondary"
                      >
                        Replace
                      </Button>
                    </Col>
                  </Row>
                )}
                {!!formik.errors.thumbnail && !!formik.submitCount && (
                  <div className="invalid-feedback d-block">{formik.errors.thumbnail}</div>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <ValidatedFormInput
                disabled={isPending}
                field="description"
                formik={formik}
                label="Description"
                placeholder="Lorem ipsum dolor sit amet..."
                rows={3}
                textarea
              />
            </Col>
          </Row>
          <Row>
            <LinkInput disabled={isPending} formik={formik} label="GitHub" linkType="github" />
            <LinkInput disabled={isPending} formik={formik} label="App Store" linkType="appStore" />
            <LinkInput disabled={isPending} formik={formik} label="Website" linkType="website" />
          </Row>
        </form>
      </EditModal>
      <ErrorModal error={error} />
    </>
  );
}

interface LinkInputProps {
  linkType: LinkType;
  label: string;
  disabled: boolean;
  formik: {
    setFieldValue: (field: string, value: Record<LinkType, string>) => void;
    values: EditDevelopmentWorkValues;
  };
}

function LinkInput({ linkType, label, disabled, formik }: LinkInputProps): JSX.Element {
  const { setFieldValue, values } = formik;

  return (
    <Col>
      <Form.Group>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          defaultValue={values.links[linkType]}
          disabled={disabled}
          // TODO: apply invalid styles
          onChange={e => {
            const newLinks = values.links;
            newLinks[linkType] = e.target.value;
            setFieldValue("links", newLinks);
          }}
        />
      </Form.Group>
    </Col>
  );
}
