import { AsyncComponent } from "components";
import { DesignWork } from "models";
import React, { useState } from "react";
import { getDesignWorks } from "services";

export function DesignSection(): JSX.Element {
  const [designWorks, setDesignWorks] = useState<DesignWork[]>([]);

  return (
    <AsyncComponent getData={getDesignWorks} setData={setDesignWorks}>
      <ul>
        {designWorks.map(work => (
          <li key={work.title}>
            {work.title} – {work.description}
          </li>
        ))}
      </ul>
    </AsyncComponent>
  );
}
