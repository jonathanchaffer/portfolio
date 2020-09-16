import { AsyncComponent } from "components";
import { DevelopmentWork } from "models";
import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { getDevelopmentThumbnailURL, getDevelopmentWorks } from "services";
import "./DevelopmentSection.scss";

export function DevelopmentSection(): JSX.Element {
  const [developmentWorks, setDevelopmentWorks] = useState<DevelopmentWork[]>([]);

  return (
    <AsyncComponent getData={getDevelopmentWorks} setData={setDevelopmentWorks}>
      {developmentWorks.map(work => (
        // TODO: add an id field to DevelopmentWork and use as key
        <DevelopmentWorkCard work={work} key={work.title} />
      ))}
    </AsyncComponent>
  );
}

interface DevelopmentWorkCardProps {
  work: DevelopmentWork;
}

function DevelopmentWorkCard({ work }: DevelopmentWorkCardProps): JSX.Element {
  const { title, description, links } = work;
  const [thumbnailURL, setThumbnailURL] = useState<string | undefined>(undefined);

  return (
    <Card>
      <Card.Body className="d-flex flex-column flex-sm-row">
        <div className="img-container mb-3 my-sm-0 mr-sm-4">
          <AsyncComponent
            getData={() => getDevelopmentThumbnailURL(work)}
            setData={setThumbnailURL}
          >
            {thumbnailURL && <img src={thumbnailURL} alt={title} />}
          </AsyncComponent>
        </div>
        <div>
          <Card.Title>{title}</Card.Title>
          <p>{description}</p>
          <div className="links">
            <DevelopmentLink url={links.github}>View on GitHub</DevelopmentLink>
            <DevelopmentLink url={links.appStore}>View on App Store</DevelopmentLink>
            <DevelopmentLink url={links.website}>View Website</DevelopmentLink>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

interface DevelopmentLinkProps {
  url: string | undefined;
  children: React.ReactNode;
}

function DevelopmentLink({ url, children }: DevelopmentLinkProps): JSX.Element {
  return url ? (
    <a href={url} target="blank" className="caption">
      {children}
    </a>
  ) : (
    <></>
  );
}
