"use client";

import { FileUpload } from "@/components/FileUpload";
import { eliminateDuplicates, extractExerciseNames } from "@/data/utils";
import { DataPoint } from "@/types";
import { exerciseCategories, handleUpload } from "@/utils";
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
  Text,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const DataProc = () => {
  const [allData, setAllData] = useState<DataPoint[]>([]);
  const [exerciseNames, setNames] = useState<string[]>([]);
  const [categorization, setCategorization] = useState<Map<string, string>>(
    new Map()
  );

  useEffect(() => {
    setNames(extractExerciseNames(allData));

    const defaultValue = exerciseCategories[0];

    const temp = new Map<string, string>();

    for (const name of exerciseNames) {
      temp.set(name, defaultValue);
    }

    setCategorization(temp);
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

            <Flex
              flexDir={"column"}
              align={"center"}
              w="35%"
              h="25vh"
              overflowY={"auto"}
              mt={5}
            >
              {exerciseNames.map((v, k) => {
                return (
                  <Flex
                    gap={2}
                    w="100%"
                    justify={"space-between"}
                    align={"center"}
                  >
                    <Text justifySelf={"flex-start"} fontWeight={"semibold"}>
                      {v}
                    </Text>
                    <Select
                      justifySelf={"flex-end"}
                      placeholder="Select Category"
                      defaultValue={exerciseNames[0]}
                      w="30%"
                      onChange={(e) => {
                        setCategorization(
                          categorization.set(v, e.target.value)
                        );
                      }}
                    >
                      {exerciseCategories.map((v, k) => {
                        return (
                          <option value={v} key={k}>
                            {v}
                          </option>
                        );
                      })}
                    </Select>
                  </Flex>
                );
              })}
            </Flex>

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
