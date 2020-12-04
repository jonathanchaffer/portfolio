import { ConfirmationModal, EditDevelopmentWorkModal, ErrorModal } from "components";
import { UserContext } from "contexts";
import { DevelopmentWork } from "models";
import React, { useCallback, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { deleteDevelopmentWork, useErrorHandling } from "services";

// TODO: work with both development and design works
interface PortfolioControlsProps {
  work: DevelopmentWork;
}

export function PortfolioControls({ work }: PortfolioControlsProps): JSX.Element {
  const [isShowingEditModal, setIsShowingEditModal] = useState(false);
  const [isShowingConfirmDeleteModal, setIsShowingConfirmDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const user = useContext(UserContext);
  const { error, handleError } = useErrorHandling();

  const handleDelete = useCallback(() => {
    let isCurrent = true;

    setIsDeleting(true);
    deleteDevelopmentWork(work)
      .catch(err => {
        if (isCurrent) handleError(err);
      })
      .finally(() => {
        if (isCurrent) {
          setIsShowingConfirmDeleteModal(false);
          setIsDeleting(false);
          window.location.reload();
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [handleError, work]);

  return (
    <>
      {user && (
        <>
          <div className="options">
            <Button className="caption" onClick={() => setIsShowingEditModal(true)} variant="link">
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
          <EditDevelopmentWorkModal
            onHide={() => setIsShowingEditModal(false)}
            show={isShowingEditModal}
            work={work as DevelopmentWork}
          />
          <ConfirmationModal
            confirmText="Delete"
            disabled={isDeleting}
            message="Are you sure you want to delete this item? This action cannot be undone."
            onCancel={() => setIsShowingConfirmDeleteModal(false)}
            onConfirm={handleDelete}
            show={isShowingConfirmDeleteModal}
            variant="danger"
          />
        </>
      )}
      <ErrorModal error={error} />
    </>
  );
}
