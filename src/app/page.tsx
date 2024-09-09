"use client";

import { FileUpload } from "@/components/FileUpload";
import { Flex } from "@chakra-ui/react";
import * as d3 from "d3";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    var reader = new FileReader();

    reader.readAsText(e.target.files[0]);

    reader.onload = (event) => {
      const data = d3.csvParse(event.target!.result as string);
      console.log(data);
    };
  };

  return (
    <>
      <Flex justify={"center"}>
        <FileUpload
          onHandle={(file) => {
            handleUpload(file);
          }}
        />
      </Flex>
    </>
  );
}
