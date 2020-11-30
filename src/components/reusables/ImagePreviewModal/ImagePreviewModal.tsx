import { AsyncImage } from "components";
import React from "react";
import { Button, Carousel, CarouselItem, Modal } from "react-bootstrap";
import "./ImagePreviewModal.scss";

interface ImagePreviewModalProps {
  filenames: string[];
  isShowing: boolean;
  onHide: () => void;
}

export function ImagePreviewModal({
  filenames,
  isShowing,
  onHide,
}: ImagePreviewModalProps): JSX.Element {
  const multiple = filenames.length > 1;

  return (
    <Modal className="image-preview-modal" onHide={onHide} show={isShowing}>
      <Button className="close-button" onClick={onHide} variant="link">
        <i className="fas fa-times" />
      </Button>
      <Carousel
        controls={multiple}
        fade
        indicators={multiple}
        interval={null}
        nextIcon={<i className="fas fa-chevron-right" />}
        prevIcon={<i className="fas fa-chevron-left" />}
      >
        {filenames.map(filename => (
          <CarouselItem key={filename}>
            <div className="d-flex justify-content-center">
              <AsyncImage key={filename} alt={filename} filename={filename} />
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </Modal>
  );
}
