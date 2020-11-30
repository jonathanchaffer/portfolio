import React from "react";
import { Button, Modal } from "react-bootstrap";

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
      centered
      onHide={() => {
        onHide();
        onReset();
      }}
      show={show}
      size="lg"
    >
      <Modal.Body>
        <Modal.Title>{title}</Modal.Title>
        {children}
        <div className="d-flex justify-content-end modal-buttons">
          <Button
            disabled={isPending}
            onClick={() => {
              onHide();
              onReset();
            }}
            variant="outline-secondary"
          >
            Cancel
          </Button>
          <Button disabled={isPending} onClick={onSave}>
            Save
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
