import loadingAnimation from "assets/loading-animation.gif";
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
        <DevelopmentWorkCard key={work.id} work={work} />
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
            <Img alt={work.title} placeholder={loadingAnimation} src={thumbnailURL || ""} />
          </div>
          <div>
            <div className="d-flex justify-content-between">
              <Card.Title>{title}</Card.Title>
              {user && (
                <div className="options">
                  <Button
                    className="caption"
                    onClick={() => setIsShowingEditModal(true)}
                    variant="link"
                  >
                    Edit
                  </Button>
                  <Button
                    className="caption"
                    onClick={() => setIsShowingConfirmDeleteModal(true)}
                    variant="link"
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
            onHide={() => setIsShowingEditModal(false)}
            show={isShowingEditModal}
            work={work}
          />
          <ConfirmationModal
            confirmText="Delete"
            disabled={isDeleting}
            message="Are you sure you want to delete this item? This action cannot be undone."
            onCancel={() => setIsShowingConfirmDeleteModal(false)}
            onConfirm={deleteWork}
            show={isShowingConfirmDeleteModal}
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
    <a className="caption" href={url} target="blank">
      {children}
    </a>
  ) : (
    <></>
  );
}
