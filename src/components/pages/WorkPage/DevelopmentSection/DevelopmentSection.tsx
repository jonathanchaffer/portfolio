import {
  AsyncComponent,
  ConfirmationModal,
  EditDevelopmentWorkModal,
  ErrorModal,
} from "components";
import { UserContext } from "contexts";
import { DevelopmentWork } from "models";
import React, { useCallback, useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Img from "react-cool-img";
import {
  deleteDevelopmentWork,
  getDevelopmentThumbnailURL,
  getDevelopmentWorks,
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
  const [isShowingConfirmDeleteModal, setIsShowingConfirmDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const user = useContext(UserContext);
  const { error, handleError } = useErrorHandling();

  const deleteWork = useCallback(() => {
    setIsDeleting(true);
    deleteDevelopmentWork(work)
      .catch(err => handleError(err))
      .finally(() => {
        setIsShowingConfirmDeleteModal(false);
        setIsDeleting(false);
        window.location.reload();
      });
  }, [handleError, work]);

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
            <Img src={thumbnailURL || ""} alt={work.title} />
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
                  <Button
                    variant="link"
                    className="caption"
                    onClick={() => setIsShowingConfirmDeleteModal(true)}
                  >
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
        <>
          <EditDevelopmentWorkModal
            work={work}
            show={isShowingEditModal}
            onHide={() => setIsShowingEditModal(false)}
          />
          <ConfirmationModal
            show={isShowingConfirmDeleteModal}
            onCancel={() => setIsShowingConfirmDeleteModal(false)}
            onConfirm={deleteWork}
            disabled={isDeleting}
            message="Are you sure you want to delete this item? This action cannot be undone."
            confirmText="Delete"
            variant="danger"
          />
        </>
      )}
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
