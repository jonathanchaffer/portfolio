import { ErrorModal } from "components";
import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Fader from "react-fader";
import { useErrorHandling } from "services";

interface AsyncComponentProps<A> {
  getData: () => Promise<A>;
  setData: React.Dispatch<React.SetStateAction<A>>;
  children: React.ReactNode;
  loadingElement?: JSX.Element;
}

export function AsyncComponent<A>({
  getData,
  setData,
  children,
  loadingElement,
}: AsyncComponentProps<A>): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);
  const { error, handleError } = useErrorHandling();

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);
    getData()
      .then(data => {
        if (isCurrent) setData(data);
      })
      .catch(err => {
        if (isCurrent) handleError(err);
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });
    return () => {
      isCurrent = false;
    };
  }, [getData, setData, handleError]);

  return (
    <>
      <Fader animateHeight>
        {isLoading ? (
          loadingElement || (
            <div className="d-flex justify-content-center">
              <Spinner animation="border" size="sm" className="m-3" />
            </div>
          )
        ) : (
          <>{children}</>
        )}
      </Fader>
      <ErrorModal error={error} />
    </>
  );
}
