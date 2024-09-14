"use client";

import { FileUpload } from "@/components/FileUpload";
import { eliminateDuplicates, extractExerciseNames } from "@/data/utils";
import { DataPoint } from "@/types";
import { handleUpload } from "@/utils";
import {
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
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
            <TableContainer h="50vh" overflowY={"auto"}>
              <Table variant={"striped"} colorScheme="gray">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Date</Th>
                    <Th>Weight</Th>
                    <Th>Reps</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {allData.map((e, idx) => {
                    const { name, date, weight: value, reps } = e;

                    return (
                      <Tr key={idx}>
                        <Td>{name}</Td>
                        <Td>{date.toDateString()}</Td>
                        <Td>{value}</Td>
                        <Td>{reps}</Td>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
            </TableContainer>

            <Button
              onClick={() => {
                console.log(allData);
              }}
              mt={5}
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
