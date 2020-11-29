import React from "react";
import { Button, Modal } from "react-bootstrap";

interface ConformationModalProps {
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title?: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
  variant?: "danger";
}

export function ConfirmationModal({
  show,
  onCancel,
  onConfirm,
  title,
  message,
  cancelText,
  confirmText,
  variant,
}: ConformationModalProps): JSX.Element {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Body>
        <Modal.Title>{title || "Confirmation"}</Modal.Title>
        <p>{message}</p>
        <div className="d-flex justify-content-end">
          <Button variant="outline-secondary" onClick={onCancel}>
            {cancelText || "Cancel"}
          </Button>
          <Button variant={variant || "primary"} onClick={onConfirm}>
            {confirmText || "Confirm"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
