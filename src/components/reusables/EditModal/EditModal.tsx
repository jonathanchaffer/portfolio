import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./EditModal.scss";

interface EditModalProps {
  show: boolean;
  onCancel: () => void;
  onSave: () => void;
  title: string;
  children: React.ReactNode;
}

export function EditModal({
  show,
  onCancel,
  onSave,
  title,
  children,
}: EditModalProps): JSX.Element {
  return (
    <Modal show={show} onHide={onCancel} centered size="lg">
      <Modal.Body>
        <Modal.Title>{title}</Modal.Title>
        {children}
        <div className="d-flex justify-content-end edit-modal-buttons">
          <Button variant="outline-secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
