import { ErrorModal, SpinnerContainer } from "components";
import React, { useEffect, useState } from "react";
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
      {isLoading ? loadingElement || <SpinnerContainer /> : <>{children}</>}
      <ErrorModal error={error} />
    </>
  );
}
