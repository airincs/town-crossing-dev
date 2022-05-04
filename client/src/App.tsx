import React, { FC, useEffect } from "react";
import { Container, Flex } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getNotes } from "./actions/notes";
import Bulletin from "./components/Bulletin/Bulletin";
import NoteForm from "./components/NoteForm/NoteForm";

const App: FC = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

  return (
    <div>
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
    </div>
  );
};

export default App;
