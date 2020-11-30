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
    <Modal centered onHide={onCancel} show={show}>
      <Modal.Body>
        <Modal.Title>{title || "Confirmation"}</Modal.Title>
        <p>{message}</p>
        <div className="d-flex justify-content-end modal-buttons">
          <Button disabled={disabled} onClick={onCancel} variant="outline-secondary">
            {cancelText || "Cancel"}
          </Button>
          <Button disabled={disabled} onClick={onConfirm} variant={variant || "primary"}>
            {confirmText || "Confirm"}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
