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
import { motion, LazyMotion, domAnimation, m } from "framer-motion";

const Bulletin: FC = () => {
  const notes = useSelector((state: any) => state.notes);
  const [searchedNotes, setSearchedNotes] = useState<any>([]);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    setSearchedNotes(notes);
  }, [notes]);

  return (
    <Flex justify={"space-between"} w={"80vw"}>
      <Flex
        direction={"column"}
        align={"center"}
        justify={"space-between"}
        width={"40vw"}
        bg={"blackAlpha.400"}
      >
        <Flex>
          <FormControl></FormControl>
        </Flex>
        <NoteForm />
      </Flex>
      <Flex
        direction={"column"}
        align={"center"}
        width={"60vw"}
        bg={"whiteAlpha.300"}
      >
        <Text>Bulletin</Text>
        <Flex
          direction={"column"}
          overflowY={"scroll"}
          width={"90%"}
          align={"center"}
          maxH={"80vh"}
        >
          {searchedNotes.map((note: any) => (
            <Box key={note._id} shadow={"2xl"}>
              <Note note={note} />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Bulletin;
