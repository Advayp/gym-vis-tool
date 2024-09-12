"use client";

import { FormLabel, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface Props {
  onHandle: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const FileUpload: React.FC<Props> = ({ onHandle }) => {
  return (
    <>
      <FormLabel
        bg="red.400"
        p={2}
        color="white"
        textAlign={"center"}
        htmlFor="data-file"
        w="25%"
        borderRadius={"md"}
        _hover={{
          backgroundColor: "red.500",
        }}
        cursor="pointer"
      >
        <Input
          id="data-file"
          type="file"
          display={"none"}
          accept=".csv"
          onChange={(e) => {
            onHandle(e);
          }}
        />
        File Upload
      </FormLabel>
    </>
  );
};
