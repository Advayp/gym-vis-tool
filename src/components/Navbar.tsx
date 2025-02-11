"use client";

import { Flex, Spacer } from "@chakra-ui/react";
import { Link as NextLink } from "@chakra-ui/next-js";

export const Navbar = () => {
  return (
    <>
      <Flex
        align={"center"}
        width="100vw"
        height={"8vh"}
        position="sticky"
        as="header"
        borderBottomWidth={"1.5px"}
        color="white"
        bgColor="red.400"
        zIndex={"overlay"}
        mb={4}
      >
        <NextLink href={"/"} ml={5} fontWeight="black" fontSize={"2xl"}>
          GymVis
        </NextLink>
        <Spacer />
        <NextLink href={"/about"} mr={5}>
          About
        </NextLink>
        <NextLink href={"/visualizations"} mr={5}>
          Visualizations
        </NextLink>
        <NextLink href={"/dataproc"} mr={5}>
          Data
        </NextLink>
      </Flex>
    </>
  );
};
