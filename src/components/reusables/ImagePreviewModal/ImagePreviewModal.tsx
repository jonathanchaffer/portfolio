import { AsyncImage } from "components";
import React from "react";
import { Carousel, CarouselItem, Modal } from "react-bootstrap";
import "./ImagePreviewModal.scss";

interface ImagePreviewModalProps {
  filenames: string[];
  isShowing: boolean;
}

export function ImagePreviewModal({ filenames, isShowing }: ImagePreviewModalProps): JSX.Element {
  return (
    <Modal show={isShowing}>
      <Carousel fade>
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
