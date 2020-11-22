import { AsyncComponent } from "components";
import { ErrorModal, ValidatedFormInput } from "components/reusables";
import { EditModal } from "components/reusables/EditModal/EditModal";
import { UserContext } from "contexts";
import { useFormik } from "formik";
import { DevelopmentWork } from "models";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import {
  getDevelopmentThumbnailURL,
  getDevelopmentWorks,
  updateDevelopmentWork,
  useErrorHandling,
} from "services";
import "./DevelopmentSection.scss";

export function DevelopmentSection(): JSX.Element {
  const [developmentWorks, setDevelopmentWorks] = useState<DevelopmentWork[]>([]);

  return (
    <AsyncComponent getData={getDevelopmentWorks} setData={setDevelopmentWorks}>
      {developmentWorks.map(work => (
        <DevelopmentWorkCard work={work} key={work.id} />
      ))}
    </AsyncComponent>
  );
}

interface DevelopmentWorkCardProps {
  work: DevelopmentWork;
}

function DevelopmentWorkCard({ work }: DevelopmentWorkCardProps): JSX.Element {
  const { title, description, links } = work;
  const [thumbnailURL, setThumbnailURL] = useState<string | undefined>(undefined);
  const [isShowingEditModal, setIsShowingEditModal] = useState(false);
  const user = useContext(UserContext);
  const { error, handleError } = useErrorHandling();

  useEffect(() => {
    getDevelopmentThumbnailURL(work)
      .then(url => setThumbnailURL(url))
      .catch(err => handleError(err));
  });

  return (
    <>
      <Card>
        <Card.Body className="d-flex flex-column flex-sm-row">
          <div className="img-container mb-3 my-sm-0 mr-sm-4">
            {/* TODO: show spinner when thumbnail is loading */}
            <img src={thumbnailURL} alt={work.title} />
          </div>
          <div>
            <div className="d-flex justify-content-between">
              <Card.Title>{title}</Card.Title>
              {user && (
                <div className="options">
                  <Button
                    variant="link"
                    className="caption"
                    onClick={() => setIsShowingEditModal(true)}
                  >
                    Edit
                  </Button>
                  <Button variant="link" className="caption">
                    Delete
                  </Button>
                </div>
              )}
            </div>
            <p>{description}</p>
            <div className="links">
              <DevelopmentLink url={links.github}>View on GitHub</DevelopmentLink>
              <DevelopmentLink url={links.appStore}>View on App Store</DevelopmentLink>
              <DevelopmentLink url={links.website}>View Website</DevelopmentLink>
            </div>
          </div>
        </Card.Body>
      </Card>
      {user && (
        <EditDevelopmentWorkModal
          work={work}
          show={isShowingEditModal}
          onHide={() => setIsShowingEditModal(false)}
        />
      )}
      <ErrorModal error={error} />
    </>
  );
}

interface EditDevelopmentWorkModalProps {
  work: DevelopmentWork;
  show: boolean;
  onHide: () => void;
}

function EditDevelopmentWorkModal({
  work,
  show,
  onHide,
}: EditDevelopmentWorkModalProps): JSX.Element {
  const [isPending, setIsPending] = useState(false);
  const { error, handleError } = useErrorHandling();

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

interface DevelopmentLinkProps {
  url: string | undefined;
  children: React.ReactNode;
}

function DevelopmentLink({ url, children }: DevelopmentLinkProps): JSX.Element {
  return url ? (
    <a href={url} target="blank" className="caption">
      {children}
    </a>
  ) : (
    <></>
  );
}
