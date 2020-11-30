import { AsyncComponent } from "components";
import React, { useState } from "react";
import { getFileURL } from "services";

interface AsyncImageProps {
  filename: string;
  alt: string;
}

export function AsyncImage({ filename, alt }: AsyncImageProps): JSX.Element {
  const [fileURL, setFileURL] = useState<string | undefined>(undefined);

  return (
    <AsyncComponent getData={() => getFileURL(filename)} setData={setFileURL}>
      <img alt={alt} src={fileURL} />
    </AsyncComponent>
  );
}
