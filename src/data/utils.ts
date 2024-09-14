import { DataPoint, StoredInfos } from "@/types";
import * as d3 from "d3";
import { calculateOneRepMax } from "@/utils";

export const getOneRepMaxes = (data: DataPoint[]) => {
  if (!data) {
    return [];
  }

  for (const elem of data) {
    elem.weight = calculateOneRepMax(elem.weight, elem.reps);
  }

  return data;
};

export const eliminateDuplicates = (data: DataPoint[]) => {
  if (!data) {
    return [];
  }

  const map = new Map<string, Map<string, StoredInfos>>();

  // Aggregate max values from each exercise performed
  for (const elem of data) {
    const { name, weight, date, reps } = elem;

    const parsedDate = date.toLocaleDateString("en-US");

    if (map.has(parsedDate)) {
      const exerciseMap = map.get(parsedDate)!;

      if (exerciseMap.has(elem.name)) {
        exerciseMap.set(elem.name, { weight, reps: elem.reps });
      } else {
        exerciseMap.set(elem.name, { weight, reps: elem.reps });
      }
    } else {
      const toPut = new Map<string, StoredInfos>();

      toPut.set(name, { weight, reps });

      map.set(parsedDate, toPut);
    }
  }

  console.log(map);

  let result: DataPoint[] = [];

  map.forEach((exerciseMap, date) => {
    const dateFormatter = d3.timeParse("%m/%d/%Y");
    const formattedDate = dateFormatter(date);

    exerciseMap.forEach((value, name) => {
      result = [...result, { name, date: formattedDate!, ...value }];
    });
  });

  return result;
};

export const extractExerciseNames = (data: DataPoint[]) => {
  const set = new Set<string>();

  for (const elem of data) {
    const { name } = elem;

    set.add(name);
  }

  return Array.from(set);
};
