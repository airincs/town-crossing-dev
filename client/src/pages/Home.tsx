import React, { FC } from "react";
import { Flex, Container, Box, Text, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Note from "../components/Bulletin/Note/Note";

const Home: FC = () => {
  const notes = useSelector((state: any) => state.notes);
  const user = JSON.parse(localStorage.getItem("profile")!);

  return (
    <Flex direction={"column"} align={"center"} h={"95vh"}>
      <Container
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        paddingBottom={"5vh"}
        paddingTop={"5vh"}
        justifyContent={"center"}
        maxW={{ base: "80vw", md: "80vw" }}
        minH={"95vh"}
      >
        <Flex
          bg={"gray.700"}
          flexDirection={"column"}
          padding={"50px"}
          rounded={"25px"}
          shadow={"dark-lg"}
          color={"white"}
          height={"80vh"}
          width={{ base: "80vw", md: "60vw" }}
          justify={"space-between"}
        >
          <Flex justify={"center"} flexDirection={"column"} align={"center"}>
            <Text fontSize={"3xl"} fontWeight={"black"} letterSpacing={4}>
              Town Crossing
            </Text>
            <Text>Welcome!</Text>
          </Flex>
          <Flex flexDirection={"column"} justify={"center"} align={"center"}>
            Content
          </Flex>
          <Flex flexDirection={"column"} justify={"center"} align={"center"}>
            <Link to="/bulletin">
              <Button
                bg={"cyan.300"}
                w={{ base: "50vw", md: "30vw" }}
                color={"black"}
                mt={"8px"}
              >
                Bulletin
              </Button>
            </Link>
            <Link to="/login">
              <Button
                bg={"cyan.400"}
                w={{ base: "50vw", md: "30vw" }}
                color={"black"}
                mt={"8px"}
              >
                Login
              </Button>
            </Link>
            <Link to="/">
              <Button
                bg={"cyan.400"}
                w={{ base: "50vw", md: "30vw" }}
                color={"black"}
                mt={"8px"}
              >
                Check the weather!
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};

export default Home;
