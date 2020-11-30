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
  disabled: boolean;
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
  disabled,
}: ConformationModalProps): JSX.Element {
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Body>
        <Modal.Title>{title || "Confirmation"}</Modal.Title>
        <p>{message}</p>
        <div className="d-flex justify-content-end modal-buttons">
          <Button variant="outline-secondary" onClick={onCancel} disabled={disabled}>
            {cancelText || "Cancel"}
          </Button>
          <Button variant={variant || "primary"} onClick={onConfirm} disabled={disabled}>
            {confirmText || "Confirm"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
