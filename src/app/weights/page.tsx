"use client";

import { FileUpload } from "@/components/FileUpload";
import { LinePlot } from "@/components/Visualizations/LinePlotDate";
import { eliminateDuplicates, extractExerciseNames } from "@/data/utils";
import { LineDataPoint } from "@/types";
import { handleUpload } from "@/utils";
import { Button, Flex, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Weights() {
  const [allData, setAllData] = useState<LineDataPoint[]>([]);
  const [exerciseList, setExerciseList] = useState<string[]>([]);
  const [selectedDisplay, setDisplay] = useState<string>("");

  useEffect(() => {
    setExerciseList(extractExerciseNames(allData));
    setDisplay(exerciseList[0]);
  }, [allData]);

  return (
    <>
      <Flex justify={"center"} align={"center"} flexDir="column" w="100%">
        <FileUpload
          onHandle={(file) => {
            handleUpload(file, (d) => {
              setAllData(eliminateDuplicates(d));
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
              {exerciseList.map((e, idx) => {
                return (
                  <option value={e} key={idx}>
                    {e}
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
}
