import { Flex, Link, Spacer } from "@chakra-ui/react";

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
        <Link ml={5} fontWeight="black" fontSize={"2xl"}>
          GymVis
        </Link>
        <Spacer />
        <Link mr={5}>About</Link>
        <Link mr={5}>Visualizations</Link>
      </Flex>
    </>
  );
};
