"use client";

import { Flex, Link, Spacer } from "@chakra-ui/react";
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
        <NextLink href={"/"} mr={5}>
          Visualizations
        </NextLink>
      </Flex>
    </>
  );
};
