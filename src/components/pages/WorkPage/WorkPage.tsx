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
        jumpTitle="Design"
        jumpId="design"
        onNew={() => setIsShowingNewDevModal(true)}
      />
      <EditDevelopmentWorkModal
        work={{
          description: "",
          id: "",
          links: { appStore: "", github: "", website: "" },
          thumbnail: "",
          timestamp: firebase.firestore.Timestamp.now(),
          title: "",
        }}
        show={isShowingNewDevModal}
        onHide={() => setIsShowingNewDevModal(false)}
      />
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
  onNew?: () => void;
}

function WorkHeading({ heading, id, jumpTitle, jumpId, onNew }: WorkHeadingProps): JSX.Element {
  const user = useContext(UserContext);

  return (
    <div className="d-flex justify-content-between align-items-center mb-3" id={id}>
      <div className="d-flex flex-row align-items-center">
        <h2>{heading}</h2>
        {user && onNew && (
          <Button variant="link" className="caption ml-3" onClick={onNew}>
            New
          </Button>
        )}
      </div>
      <a href={`#${jumpId}`} className="caption">
        Jump to {jumpTitle}
      </a>
    </div>
  );
}
