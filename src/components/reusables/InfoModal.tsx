import React from "react";
import { Button, Modal } from "react-bootstrap";

interface InfoModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  message: string;
}

export function InfoModal({ show, onHide, title, message }: InfoModalProps): JSX.Element {
  return (
    <Modal centered onHide={onHide} show={show}>
      <Modal.Body>
        <Modal.Title>{title}</Modal.Title>
        <p>{message}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={onHide}>OK</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
