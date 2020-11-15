import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./EditModal.scss";

interface EditModalProps<I> {
  show: boolean;
  onHide: () => void;
  onSave: () => void;
  title: string;
  children: React.ReactNode;
  isPending: boolean;
}

export function EditModal<I>({
  show,
  onHide,
  onSave,
  title,
  children,
  isPending,
}: EditModalProps<I>): JSX.Element {
  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Body>
        <Modal.Title>{title}</Modal.Title>
        {children}
        <div className="d-flex justify-content-end edit-modal-buttons">
          <Button variant="outline-secondary" onClick={onHide} disabled={isPending}>
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
