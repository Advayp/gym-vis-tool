"use client";

import { FileUpload } from "@/components/FileUpload";
import { eliminateDuplicates, extractExerciseNames } from "@/data/utils";
import { DataPoint } from "@/types";
import { handleUpload } from "@/utils";
import { Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const DataProc = () => {
  const [allData, setAllData] = useState<DataPoint[]>([]);
  const [exerciseNames, setNames] = useState<string[]>([]);

  useEffect(() => {
    setNames(extractExerciseNames(allData));
    console.log(exerciseNames);
  }, [allData]);

  return (
    <>
      <Flex align={"center"} flexDir="column" w="100%">
        <FileUpload
          onHandle={(e) => {
            handleUpload(e, (parsed) => {
              setAllData(eliminateDuplicates(parsed));
            });
          }}
        />
        {allData.length > 0 && (
          <>
            <Button
              onClick={() => {
                console.log(allData);
              }}
            >
              View Data
            </Button>
          </>
        )}
      </Flex>
    </>
  );
};

export default DataProc;
