import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./EditModal.scss";

interface EditModalProps {
  show: boolean;
  onHide: () => void;
  onSave: () => void;
  onReset: (e: any) => void;
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
        onReset(-1);
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
              onReset(-1);
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
