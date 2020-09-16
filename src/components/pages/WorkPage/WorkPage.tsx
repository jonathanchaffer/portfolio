import { DesignSection, DevelopmentSection } from "components";
import React from "react";

export function WorkPage(): JSX.Element {
  return (
    <>
      <DevelopmentSection />
      <hr />
      <DesignSection />
    </>
  );
}
