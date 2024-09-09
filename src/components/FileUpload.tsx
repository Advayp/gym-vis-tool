"use client";

import { Button, Input } from "@chakra-ui/react";
import { ChangeEvent, useRef } from "react";

interface Props {
  onHandle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload: React.FC<Props> = ({ onHandle }) => {
  return (
    <>
      <Input
        type="file"
        onChange={(e) => {
          onHandle(e);
        }}
      />
    </>
  );
};
