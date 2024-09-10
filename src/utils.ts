import { ChangeEvent } from "react";
import * as d3 from "d3";
import { LineDataPoint } from "./types";

export const handleUpload = (
  e: ChangeEvent<HTMLInputElement>,
  complete: (
    d: d3.DSVParsedArray<{
      date: Date;
      value: number;
      name: string;
    }>
  ) => void
) => {
  if (!e.target.files) {
    console.log("here");
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

    console.log(data);

    complete(data);
  };
};
