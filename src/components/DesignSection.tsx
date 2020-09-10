import { DesignWork } from "models";
import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { getDesignWorks } from "services";

export function DesignSection(): JSX.Element {
  const [designWorks, setDesignWorks] = useState<DesignWork[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);
    getDesignWorks()
      .then(works => {
        if (isCurrent) setDesignWorks(works);
      })
      .catch(error => alert(error))
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });
    return () => {
      isCurrent = false;
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <ul>
          {designWorks.map(work => (
            <li key={work.title}>
              {work.title} – {work.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
