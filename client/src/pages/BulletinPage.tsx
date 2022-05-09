import React, { FC, useEffect } from "react";
import { Container, Flex, Box, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getNotes } from "../actions/notes";
import Bulletin from "../components/Bulletin/Bulletin";
import Header from "../components/Header/Header";

const BulletinPage: FC = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <Box paddingBottom={"1vh"} paddingTop={"1vh"}>
      <Container
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        maxW={{ base: "100vw", md: "80vw" }}
        minH={"93vh"}
        bg={"gray.700"}
        rounded={"25px"}
        shadow={"dark-lg"}
        color={"white"}
      >
        <Text fontSize={"2xl"}>Bulletin</Text>
        <Flex direction={"column"}>
          <Bulletin />
        </Flex>
      </Container>
    </Box>
  );
};

export default BulletinPage;
