import React, { FC, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Text, Box, Button } from "@chakra-ui/react";
import NoteForm from "../NoteForm/NoteForm";
import Note from "./Note/Note";

const Bulletin: FC = () => {
  const notes = useSelector((state: any) => state.notes);
  const dispatch = useDispatch<any>();

  return (
    <Flex direction={"column"} align={"center"}>
      <Text>Bulletin</Text>
      <Flex
        direction={"column-reverse"}
        overflowY={"scroll"}
        w={"70vw"}
        align={"center"}
        maxH={"80vh"}
        id="scroller"
      >
        {notes.map((note: any) => (
          <Box key={note._id} shadow={"2xl"}>
            <Note note={note} />
          </Box>
        ))}
      </Flex>
      <Flex>
        <NoteForm />
      </Flex>
    </Flex>
  );
};

export default Bulletin;
