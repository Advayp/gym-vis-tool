"use client";

import { FileUpload } from "@/components/FileUpload";
import { LinePlot } from "@/components/Visualizations/LinePlotDate";
import {
  eliminateDuplicates,
  extractExerciseNames,
  getOneRepMaxes,
} from "@/data/utils";
import { LineDataPoint } from "@/types";
import { handleUpload } from "@/utils";
import { Button, Flex, Heading, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const OneRepMax = () => {
  const [allData, setAllData] = useState<LineDataPoint[]>([]);
  const [exerciseList, setExerciseList] = useState<string[]>([]);
  const [selectedDisplay, setDisplay] = useState("");

  useEffect(() => {
    setExerciseList(extractExerciseNames(allData));
    setDisplay(exerciseList[0]);
  }, [allData]);

  return (
    <>
      <Flex w="100%" flexDir={"column"} align={"center"}>
        <FileUpload
          onHandle={(file) => {
            handleUpload(file, (data) => {
              setAllData(getOneRepMaxes(eliminateDuplicates(data)));
            });
          }}
        />
        {allData.length > 0 && (
          <>
            <Select
              placeholder="Select Exercise"
              w="25%"
              defaultValue={exerciseList[0]}
              onChange={(e) => {
                setDisplay(e.target.value);
              }}
            >
              {exerciseList.map((v, k) => {
                return (
                  <option value={v} key={k}>
                    {v}
                  </option>
                );
              })}
            </Select>

            <LinePlot
              data={allData!.filter((d) => d.name === selectedDisplay)}
              width={640}
              height={400}
              margin={{
                top: 20,
                right: 60,
                bottom: 90,
                left: 40,
              }}
            />

            <Button
              onClick={() => {
                console.log(allData.filter((d) => d.name === selectedDisplay));
              }}
            >
              View data
            </Button>
          </>
        )}
      </Flex>
    </>
  );
};

export default OneRepMax;
