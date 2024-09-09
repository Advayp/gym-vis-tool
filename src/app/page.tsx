"use client";

import { FileUpload } from "@/components/FileUpload";
import { LinePlot } from "@/components/Visualizations/LinePlotDate";
import { Button, Flex, Select } from "@chakra-ui/react";
import * as d3 from "d3";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [allData, setAllData] = useState<LineDataPoint[]>([]);
  const [exerciseList, setExerciseList] = useState<string[]>([]);
  const [selectedDisplay, setDisplay] = useState<string>("");

  const extractExerciseNames = (data: LineDataPoint[]) => {
    const set = new Set<string>();

    for (const elem of data) {
      const { name } = elem;

      set.add(name);
    }

    return Array.from(set);
  };

  const eliminateDuplicates = (data: LineDataPoint[]) => {
    const map = new Map<string, Map<string, number>>();

    // Aggregate max values from each exercise performed
    for (const elem of data) {
      const { name, value, date } = elem;

      const parsedDate = date.toLocaleDateString("en-US");

      if (map.has(parsedDate)) {
        const exerciseMap = map.get(parsedDate)!;

        if (exerciseMap.has(elem.name)) {
          exerciseMap.set(
            elem.name,
            Math.max(exerciseMap.get(elem.name)!, elem.value)
          );
        } else {
          exerciseMap.set(elem.name, elem.value);
        }
      } else {
        const toPut = new Map<string, number>();

        toPut.set(name, value);

        map.set(parsedDate, toPut);
      }
    }

    console.log(map);

    let result: LineDataPoint[] = [];

    map.forEach((exerciseMap, date) => {
      const dateFormatter = d3.timeParse("%m/%d/%Y");
      const formattedDate = dateFormatter(date);

      exerciseMap.forEach((value, name) => {
        result = [...result, { name, value, date: formattedDate! }];
      });
    });

    return result;
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    var reader = new FileReader();

    reader.readAsText(e.target.files[0]);

    reader.onload = (event) => {
      const data = d3.csvParse(event.target!.result as string, (d) => {
        const date = d3.timeParse("%Y-%m-%d")(d.Date.split(" ")[0]);

        if (date === null) {
          throw new Error("Invalid Date format.");
        }

        return {
          date: date,
          value: Math.round(+d.Weight * 100) / 100,
          name: d["Exercise Name"],
        };
      });

      console.log(data.columns);

      setAllData(eliminateDuplicates(data));
    };
  };

  useEffect(() => {
    setExerciseList(extractExerciseNames(allData));
    setDisplay(exerciseList[0]);
  }, [allData]);

  return (
    <>
      <Flex justify={"center"} align={"center"} flexDir="column" w="100%">
        <FileUpload
          onHandle={(file) => {
            handleUpload(file);
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
              marginTop={20}
              marginRight={60}
              marginBottom={90}
              marginLeft={40}
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
