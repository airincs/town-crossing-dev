import React from "react";
import { useSelector } from "react-redux";
import { Flex, Box } from "@chakra-ui/react";
import NoteForm from "../NoteForm/NoteForm";
import Note from "./Note/Note";

type AppProps = {
  username: string;
};

const UserBulletin = ({ username }: AppProps) => {
  const notes = useSelector((state: any) =>
    state.notes.filter((note: any) => note.username.includes(username))
  );

  return (
    <Flex
      direction={"column"}
      align={"center"}
      width={{ base: "100vw", md: "80vw" }}
    >
      <Flex
        direction={"column"}
        overflowY={"scroll"}
        width={{ base: "100%", md: "90%" }}
        align={"center"}
        maxH={"75vh"}
        paddingTop={"30px"}
        paddingBottom={"30px"}
        marginTop={"5px"}
        marginBottom={"5px"}
      >
        {notes.map((note: any) => (
          <Box key={note._id} shadow={"2xl"}>
            <Note note={note} />
          </Box>
        ))}
      </Flex>
      <NoteForm />
    </Flex>
  );
};

export default UserBulletin;
