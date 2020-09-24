import { AsyncImage } from "components";
import React from "react";
import { Carousel, CarouselItem, Modal } from "react-bootstrap";
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
    <Modal show={isShowing} onHide={onHide}>
      <Carousel
        fade
        controls={multiple}
        indicators={multiple}
        nextIcon={<i className="fas fa-chevron-right" />}
        prevIcon={<i className="fas fa-chevron-left" />}
      >
        {filenames.map(filename => (
          <CarouselItem key={filename}>
            <div className="d-flex justify-content-center">
              <AsyncImage key={filename} filename={filename} alt={filename} />
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </Modal>
  );
}
