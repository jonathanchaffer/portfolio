import { AsyncComponent, ErrorModal, ImagePreviewModal } from "components";
import { DesignWork } from "models";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Img from "react-cool-img";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getDesignThumbnailURL, getDesignWorks, useErrorHandling } from "services";
import "./DesignSection.scss";

export function DesignSection(): JSX.Element {
  const [designWorks, setDesignWorks] = useState<DesignWork[]>([]);

  return (
    <AsyncComponent getData={getDesignWorks} setData={setDesignWorks}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 300: 2, 600: 3, 900: 4 }}>
        <Masonry className="masonry" gutter="1.5rem">
          {designWorks.map(work => (
            <DesignWorkCard key={work.id} work={work} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </AsyncComponent>
  );
}

interface DesignWorkCardProps {
  work: DesignWork;
}

function DesignWorkCard({ work }: DesignWorkCardProps): JSX.Element {
  const [thumbnailURL, setThumbnailURL] = useState<string | undefined>(undefined);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const { error, handleError } = useErrorHandling();

  useEffect(() => {
    getDesignThumbnailURL(work)
      .then(url => setThumbnailURL(url))
      .catch(err => handleError(err));
  });

  return (
    <>
      <Card onClick={() => setIsShowingModal(true)}>
        <Img alt={work.title} src={thumbnailURL || ""} />
        <div className="text-container">
          <span className="title">{work.title}</span>
          <span className="caption">{work.timestamp.toDate().getFullYear()}</span>
        </div>
      </Card>
      <ImagePreviewModal
        filenames={work.files}
        isShowing={isShowingModal}
        onHide={() => setIsShowingModal(false)}
      />
      <ErrorModal error={error} />
    </>
  );
}
