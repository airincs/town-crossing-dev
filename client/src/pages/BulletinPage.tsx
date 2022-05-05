import React, { FC, useEffect } from "react";
import { Container, Flex, Box } from "@chakra-ui/react";
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
    <Box>
      <Container
        display={"flex"}
        justifyContent={"space-around"}
        bg={"blackAlpha.400"}
        maxW={{ base: "100vw", md: "80vw" }}
        minH={"100vh"}
      >
        <Flex direction={"column"}>
          <Bulletin />
        </Flex>
      </Container>
    </Box>
  );
};

export default BulletinPage;
