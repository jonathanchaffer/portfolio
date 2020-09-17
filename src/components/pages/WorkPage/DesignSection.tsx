import { AsyncComponent } from "components";
import { DesignWork } from "models";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { getDesignThumbnailURL, getDesignWorks } from "services";
import "./DesignSection.scss";

export function DesignSection(): JSX.Element {
  const [designWorks, setDesignWorks] = useState<DesignWork[]>([]);

  return (
    <AsyncComponent getData={getDesignWorks} setData={setDesignWorks}>
      {designWorks.map(work => (
        // TODO: add an id field to DesignWork and use as key
        <DesignWorkCard work={work} key={work.title} />
      ))}
    </AsyncComponent>
  );
}

interface DesignWorkCardProps {
  work: DesignWork;
}

function DesignWorkCard({ work }: DesignWorkCardProps): JSX.Element {
  const [thumbnailURL, setThumbnailURL] = useState<string | undefined>(undefined);

  return (
    <Card>
      <AsyncComponent getData={() => getDesignThumbnailURL(work)} setData={setThumbnailURL}>
        <img src={thumbnailURL} alt={work.title} />
      </AsyncComponent>
    </Card>
  );
}
