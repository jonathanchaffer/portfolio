import React from "react";
import { useDropzone } from "react-dropzone";
import "./FileUploader.scss";

interface FileUploaderProps {
  fileType: "image";
  onUpload: (file: File) => void;
}

export function FileUploader({ fileType, onUpload }: FileUploaderProps): JSX.Element {
  let accept = "";
  switch (fileType) {
    case "image":
      accept = "image/*";
      break;
    default:
      break;
  }

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({
    accept,
    multiple: false,
    onDrop: files => onUpload(files[0]),
  });

  return (
    <div {...getRootProps()} className={`file-uploader${isDragActive ? " drag" : ""}`}>
      <input {...getInputProps()} />
      <span>
        {acceptedFiles[0] ? (
          <>
            <i className="fas fa-file mr-2" />
            {acceptedFiles[0].name}
          </>
        ) : (
          "Drop file here, or click to select file"
        )}
      </span>
    </div>
  );
}
