"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (file: File) => void;
};

export const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      //@ts-expect-error: Erreur typscript mais pas d'erreur
      onChange(acceptedFiles);
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="image téléchargée"
          className="max-h-[400px] overflow-hidden object-cover"
        />
      ) : (
        <>
          <Image
            src="/assets/icons/upload.svg"
            width={40}
            height={40}
            alt="téléchargement"
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">Cliquez pour télécharger</span>{" "}
              ou glisser et déposer
            </p>
            <p>SVG, PNG, JPG ou Gif (max 800x400)</p>
          </div>
        </>
      )}
    </div>
  );
};
