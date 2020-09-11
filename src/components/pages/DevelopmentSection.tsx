import { AsyncComponent } from "components";
import { DevelopmentWork } from "models";
import React, { useState } from "react";
import { getDevelopmentWorks } from "services";

export function DevelopmentSection(): JSX.Element {
  const [developmentWorks, setDevelopmentWorks] = useState<DevelopmentWork[]>([]);

  return (
    <AsyncComponent getData={getDevelopmentWorks} setData={setDevelopmentWorks}>
      <ul>
        {developmentWorks.map(work => (
          <li key={work.title}>
            {work.title} – {work.description}
          </li>
        ))}
      </ul>
    </AsyncComponent>
  );
}
