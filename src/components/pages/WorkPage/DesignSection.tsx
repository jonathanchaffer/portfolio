import { AsyncComponent, ImagePreviewModal } from "components";
import { DesignWork } from "models";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getDesignThumbnailURL, getDesignWorks } from "services";
import "./DesignSection.scss";

export function DesignSection(): JSX.Element {
  const [designWorks, setDesignWorks] = useState<DesignWork[]>([]);

  return (
    <AsyncComponent getData={getDesignWorks} setData={setDesignWorks}>
      <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 300: 2, 600: 3, 900: 4 }}>
        <Masonry gutter="1.5rem" className="masonry">
          {designWorks.map(work => (
            // TODO: add an id field to DesignWork and use as key
            <DesignWorkCard work={work} key={work.title} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </AsyncComponent>
  );
}

interface DesignWorkCardProps {
  work: DesignWork;
}

// TODO: only load thumbnail on first render
function DesignWorkCard({ work }: DesignWorkCardProps): JSX.Element {
  const [thumbnailURL, setThumbnailURL] = useState<string | undefined>(undefined);
  const [isShowingModal, setIsShowingModal] = useState(false);

  return (
    <>
      <Card onClick={() => setIsShowingModal(true)}>
        <AsyncComponent getData={() => getDesignThumbnailURL(work)} setData={setThumbnailURL}>
          <img src={thumbnailURL} alt={work.title} />
          <div className="text-container">
            <span className="title">{work.title}</span>
            <span className="caption">{work.timestamp.toDate().getFullYear()}</span>
          </div>
        </AsyncComponent>
      </Card>
      <ImagePreviewModal
        filenames={work.files}
        isShowing={isShowingModal}
        onHide={() => setIsShowingModal(false)}
      />
    </>
  );
}
