import { InfoModal } from "components";
import React, { useEffect, useState } from "react";

interface ErrorModalProps {
  error: Error | undefined;
}

export function ErrorModal({ error }: ErrorModalProps): JSX.Element {
  const [isShowing, setIsShowing] = useState(false);

  useEffect((): (() => void) => {
    let isCurrent = true;
    if (isCurrent) {
      if (error !== undefined) {
        setIsShowing(true);
      }
    }
    return (): void => {
      isCurrent = false;
    };
  }, [error]);

  return (
    <>
      <InfoModal
        show={isShowing}
        title="Oops! Something went wrong."
        message={error?.message || "An error occurred."}
        onHide={() => setIsShowing(false)}
      />
    </>
  );
}
