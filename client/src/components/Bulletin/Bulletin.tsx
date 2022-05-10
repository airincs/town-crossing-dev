import React, { FC, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Flex,
  Text,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
} from "@chakra-ui/react";
import NoteForm from "../NoteForm/NoteForm";
import Note from "./Note/Note";

const Bulletin: FC = () => {
  const notes = useSelector((state: any) => state.notes);
  const [searchedNotes, setSearchedNotes] = useState<any>([]);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    setSearchedNotes(notes);
  }, [notes]);

  return (
    <Flex
      direction={"column"}
      align={"center"}
      width={{ base: "100vw", md: "80vw" }}
      //bg={"whiteAlpha.300"}
    >
      <Flex
        direction={"column"}
        overflowY={"scroll"}
        width={{ base: "100%", md: "90%" }}
        align={"center"}
        maxH={"80vh"}
        paddingTop={"30px"}
        paddingBottom={"30px"}
        marginTop={"5px"}
        marginBottom={"5px"}
      >
        {searchedNotes.map((note: any) => (
          <Box key={note._id} shadow={"2xl"}>
            <Note note={note} />
          </Box>
        ))}
      </Flex>
      <NoteForm />
    </Flex>
  );
};

export default Bulletin;
