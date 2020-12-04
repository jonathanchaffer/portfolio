import loadingAnimation from "assets/loading-animation.gif";
import {
  AsyncComponent,
  EditDevelopmentWorkModal,
  ErrorModal,
  PortfolioControls,
} from "components";
import { DevelopmentWork } from "models";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Img from "react-cool-img";
import {
  deleteDevelopmentWork,
  getDevelopmentThumbnailURL,
  getDevelopmentWorks,
  useErrorHandling,
} from "services";
import "./DevelopmentSection.scss";

export function DevelopmentSection(): JSX.Element {
  const [developmentWorks, setDevelopmentWorks] = useState<DevelopmentWork[]>([]);

  return (
    <AsyncComponent getData={getDevelopmentWorks} setData={setDevelopmentWorks}>
      {developmentWorks.map(work => (
        <DevelopmentWorkCard key={work.id} work={work} />
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
  const { error, handleError } = useErrorHandling();

  useEffect(() => {
    let isCurrent = true;

    getDevelopmentThumbnailURL(work)
      .then(url => {
        if (isCurrent) setThumbnailURL(url);
      })
      .catch(err => {
        if (isCurrent) handleError(err);
      });

    return () => {
      isCurrent = false;
    };
  });

  return (
    <>
      <Card>
        <Card.Body className="d-flex flex-column flex-sm-row">
          <div className="img-container mb-3 my-sm-0 mr-sm-4">
            <Img alt={work.title} placeholder={loadingAnimation} src={thumbnailURL || ""} />
          </div>
          <div>
            <div className="d-flex justify-content-between">
              <Card.Title>{title}</Card.Title>
              <PortfolioControls
                deleteWork={wk => deleteDevelopmentWork(wk as DevelopmentWork)}
                editModal={EditDevelopmentWorkModal}
                work={work}
              />
            </div>
            <p>{description}</p>
            <div className="links">
              <DevelopmentLink url={links.github}>View on GitHub</DevelopmentLink>
              <DevelopmentLink url={links.appStore}>View on App Store</DevelopmentLink>
              <DevelopmentLink url={links.website}>View Website</DevelopmentLink>
            </div>
          </div>
        </Card.Body>
      </Card>
      <ErrorModal error={error} />
    </>
  );
}

interface DevelopmentLinkProps {
  url: string | undefined;
  children: React.ReactNode;
}

function DevelopmentLink({ url, children }: DevelopmentLinkProps): JSX.Element {
  return url ? (
    <a className="caption" href={url} target="blank">
      {children}
    </a>
  ) : (
    <></>
  );
}
