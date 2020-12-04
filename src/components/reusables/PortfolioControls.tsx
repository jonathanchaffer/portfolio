import { ConfirmationModal, ErrorModal } from "components";
import { UserContext } from "contexts";
import { DesignWork, DevelopmentWork } from "models";
import React, { useCallback, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { useErrorHandling } from "services";

export interface EditWorkModalProps {
  work: DevelopmentWork | DesignWork;
  show: boolean;
  onHide: () => void;
}

interface PortfolioControlsProps {
  work: DevelopmentWork | DesignWork;
  deleteWork: (work: DevelopmentWork | DesignWork) => Promise<void>;
  editModal: (props: EditWorkModalProps) => JSX.Element;
}

export function PortfolioControls({
  work,
  deleteWork,
  editModal,
}: PortfolioControlsProps): JSX.Element {
  const [isShowingEditModal, setIsShowingEditModal] = useState(false);
  const [isShowingConfirmDeleteModal, setIsShowingConfirmDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const user = useContext(UserContext);
  const { error, handleError } = useErrorHandling();

  const handleDelete = useCallback(() => {
    let isCurrent = true;

    setIsDeleting(true);
    deleteWork(work)
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
  }, [handleError, work, deleteWork]);

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
          {editModal({
            onHide: () => setIsShowingEditModal(false),
            show: isShowingEditModal,
            work,
          })}
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
