import { DesignSection, DevelopmentSection } from "components";
import React from "react";

export function WorkPage(): JSX.Element {
  return (
    <>
      <h2>Development</h2>
      <DevelopmentSection />
      <h2>Design</h2>
      <DesignSection />
    </>
  );
}
