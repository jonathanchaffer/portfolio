import { DevelopmentWork } from "models";
import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { getDevelopmentWorks } from "services";

export function DevelopmentSection(): JSX.Element {
  const [developmentWorks, setDevelopmentWorks] = useState<DevelopmentWork[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);
    getDevelopmentWorks()
      .then(works => {
        if (isCurrent) setDevelopmentWorks(works);
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
          {developmentWorks.map(work => (
            <li key={work.title}>
              {work.title} – {work.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
