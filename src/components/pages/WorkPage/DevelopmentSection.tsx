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
    <Card key={title}>
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
            {links.github && (
              <a href={links.github} target="blank" className="caption">
                View on GitHub
              </a>
            )}
            {links.appStore && (
              <a href={links.appStore} target="blank" className="caption">
                View on App Store
              </a>
            )}
            {links.demo && (
              <a href={links.demo} target="blank" className="caption">
                View Demo
              </a>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
