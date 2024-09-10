"use client";

import {
  Flex,
  Heading,
  ListIcon,
  ListItem,
  List,
  Divider,
} from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "@chakra-ui/next-js";

const Visualizations = () => {
  return (
    <Flex w="100%" align={"center"} flexDir={"column"}>
      <Heading>All Visualizations</Heading>
      <Divider w={"30%"} color="red.300" mb={3} />
      <List spacing={1}>
        <ListItem fontSize={"medium"}>
          <ListIcon as={IoIosArrowForward} color="red.300" />
          <Link href={"/weights"}>Weight Over Time</Link>
        </ListItem>
        <ListItem fontSize={"medium"}>
          <ListIcon as={IoIosArrowForward} color="red.300" />
          <Link href="/onerepmax">1RM Over Time</Link>
        </ListItem>
      </List>
    </Flex>
  );
};

export default Visualizations;
