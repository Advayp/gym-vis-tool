"use client";

import { FileUpload } from "@/components/FileUpload";
import { LinePlot } from "@/components/Visualizations/LinePlotDate";
import { Button, Flex } from "@chakra-ui/react";
import * as d3 from "d3";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [allData, setAllData] = useState<LineDataPoint[]>([]);

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
          value: +d.Weight,
          name: d["Exercise Name"],
        };
      });

      console.log(data.columns);

      setAllData(data);

      console.log(allData);
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

        <LinePlot
          data={allData!.filter((d) => d.name == "Bicep Curl (Dumbbell)")}
          width={640}
          height={400}
          marginTop={20}
          marginRight={20}
          marginBottom={30}
          marginLeft={40}
        />

        <Button
          onClick={() => {
            console.log(
              allData.filter((d) => d.name == "Bicep Curl (Dumbbell)")
            );
          }}
        >
          View data
        </Button>
      </Flex>
    </>
  );
}
