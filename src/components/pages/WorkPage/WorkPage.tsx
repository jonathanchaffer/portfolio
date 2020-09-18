import { DesignSection, DevelopmentSection } from "components";
import React from "react";

export function WorkPage(): JSX.Element {
  return (
    <>
      <WorkHeading heading="Development" id="development" jumpTitle="Design" jumpId="design" />
      <DevelopmentSection />
      <hr />
      <WorkHeading heading="Design" id="design" jumpTitle="Development" jumpId="development" />
      <DesignSection />
    </>
  );
}

interface WorkHeadingProps {
  heading: string;
  id: string;
  jumpTitle: string;
  jumpId: string;
}

function WorkHeading({ heading, id, jumpTitle, jumpId }: WorkHeadingProps): JSX.Element {
  return (
    <div className="d-flex justify-content-between align-items-center mb-3" id={id}>
      <h2>{heading}</h2>
      <a href={`#${jumpId}`} className="caption">
        Jump to {jumpTitle}
      </a>
    </div>
  );
}
