import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./EditModal.scss";

interface EditModalProps {
  show: boolean;
  onHide: () => void;
  onSave: () => void;
  onReset: () => void;
  title: string;
  children: React.ReactNode;
  isPending: boolean;
}

export function EditModal({
  show,
  onHide,
  onSave,
  onReset,
  title,
  children,
  isPending,
}: EditModalProps): JSX.Element {
  return (
    <Modal
      show={show}
      onHide={() => {
        onHide();
        onReset();
      }}
      centered
      size="lg"
    >
      <Modal.Body>
        <Modal.Title>{title}</Modal.Title>
        {children}
        <div className="d-flex justify-content-end edit-modal-buttons">
          <Button
            variant="outline-secondary"
            onClick={() => {
              onHide();
              onReset();
            }}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={onSave} disabled={isPending}>
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
