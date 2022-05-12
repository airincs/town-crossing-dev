import React, { FC, useEffect } from "react";
import { Container, Flex, Box, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getNotes } from "../actions/notes";
import UserBulletin from "../components/Bulletin/UserBulletin";

const UserNotesPage: FC = () => {
  const dispatch = useDispatch<any>();
  const user = JSON.parse(localStorage.getItem("profile")!);
  const username = `${user.result.username}`;

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
        <Text fontSize={"2xl"}>My Notes</Text>
        <Flex direction={"column"}>
          <UserBulletin username={username} />
        </Flex>
      </Container>
    </Box>
  );
};

export default UserNotesPage;
