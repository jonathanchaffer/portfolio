import { DesignSection, DevelopmentSection, EditDevelopmentWorkModal } from "components";
import { UserContext } from "contexts";
import * as firebase from "firebase";
import React, { useContext, useState } from "react";
import { Button } from "react-bootstrap";

export function WorkPage(): JSX.Element {
  const [isShowingNewDevModal, setIsShowingNewDevModal] = useState(false);
  return (
    <>
      <WorkHeading
        heading="Development"
        id="development"
        jumpId="design"
        jumpTitle="Design"
        onNew={() => setIsShowingNewDevModal(true)}
      />
      <EditDevelopmentWorkModal
        onHide={() => setIsShowingNewDevModal(false)}
        show={isShowingNewDevModal}
        work={{
          description: "",
          id: "",
          links: { appStore: "", github: "", website: "" },
          thumbnail: "",
          timestamp: firebase.firestore.Timestamp.now(),
          title: "",
        }}
      />
      <DevelopmentSection />
      <hr />
      <WorkHeading heading="Design" id="design" jumpId="development" jumpTitle="Development" />
      <DesignSection />
    </>
  );
}

interface WorkHeadingProps {
  heading: string;
  id: string;
  jumpTitle: string;
  jumpId: string;
  onNew?: () => void;
}

function WorkHeading({ heading, id, jumpTitle, jumpId, onNew }: WorkHeadingProps): JSX.Element {
  const user = useContext(UserContext);

  return (
    <div className="d-flex justify-content-between align-items-center mb-3" id={id}>
      <div className="d-flex flex-row align-items-center">
        <h2>{heading}</h2>
        {user && onNew && (
          <Button className="caption ml-3" onClick={onNew} variant="link">
            New
          </Button>
        )}
      </div>
      <a className="caption" href={`#${jumpId}`}>
        Jump to {jumpTitle}
      </a>
    </div>
  );
}
