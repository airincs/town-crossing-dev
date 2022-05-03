import React, { FC } from "react";
import { Container, Flex } from "@chakra-ui/react";
import Bulletin from "./components/Bulletin/Bulletin";
import NoteForm from "./components/NoteForm/NoteForm";

const App: FC = () => {
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
        <Flex direction={"column"}>
          <NoteForm />
        </Flex>
      </Container>
    </div>
  );
};

export default App;
