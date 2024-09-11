import { ChangeEvent } from "react";
import * as d3 from "d3";
import { LineDataPoint } from "./types";

export const handleUpload = (
  e: ChangeEvent<HTMLInputElement>,
  complete: (d: d3.DSVParsedArray<LineDataPoint>) => void
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
        reps: +d.Reps,
      };
    });

    console.log(data);

    complete(data);
  };
};

// Source: strengthlevel.com/one-rep-max-calculator
const RepetitiontoPercMap = {
  1: 1,
  2: 0.97,
  3: 0.94,
  4: 0.92,
  5: 0.89,
  6: 0.86,
  7: 0.83,
  8: 0.81,
  9: 0.78,
  10: 0.75,
  11: 0.73,
  12: 0.71,
  13: 0.7,
  14: 0.68,
  15: 0.67,
  16: 0.65,
  17: 0.64,
  18: 0.63,
  19: 0.61,
  20: 0.6,
  21: 0.59,
  22: 0.58,
  23: 0.57,
  24: 0.56,
  25: 0.55,
  26: 0.54,
  27: 0.53,
  28: 0.52,
  29: 0.51,
  30: 0.5,
};

export const calculateOneRepMax = (weight: number, reps: number) => {
  if (reps in RepetitiontoPercMap) {
    //@ts-expect-error
    return weight / RepetitiontoPercMap[reps];
  }

  return -1;
};
