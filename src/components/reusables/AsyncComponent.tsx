import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Fader from "react-fader";

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

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);
    getData()
      .then(data => {
        if (isCurrent) setData(data);
      })
      // TODO: better alert
      .catch(error => alert(error.message))
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });
    return () => {
      isCurrent = false;
    };
  }, [getData, setData]);

  return (
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
  );
}
