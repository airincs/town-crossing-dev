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
    <Box
      paddingBottom={{ base: "0vh", md: "1vh" }}
      paddingTop={{ base: "0vh", md: "0.5vh" }}
    >
      <Container
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        maxW={{ base: "95vw", md: "80vw" }}
        h={{ base: "93vh", md: "93.5vh" }}
        bg={"gray.700"}
        rounded={"25px"}
        shadow={"dark-lg"}
        color={"white"}
      >
        <Flex>
          <Text fontSize={"xl"} mt={"5px"}>
            Bulletin
          </Text>
        </Flex>
        <Flex direction={"column"} h={{ base: "90vh", md: "100vh" }}>
          <Bulletin />
        </Flex>
      </Container>
    </Box>
  );
};

export default BulletinPage;
