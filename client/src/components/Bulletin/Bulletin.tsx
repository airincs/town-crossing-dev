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

  const filterSearch = (array: Array<any>, string: string) => {
    return array.filter((o) => o.message.includes(string));
  };

  const handleSearch = () => {
    const newArray = filterSearch(searchedNotes, "i");
    console.log(newArray);
    setSearchedNotes(newArray);
    return;
  };

  return (
    <Flex
      direction={"column"}
      align={"center"}
      width={{ base: "100vw", md: "80vw" }}
      paddingBottom={"50px"}
      position={"relative"}
    >
      <NoteForm />
      <Flex
        direction={"column"}
        overflowY={"scroll"}
        width={{ base: "100%", md: "90%" }}
        align={"center"}
        maxH={"80vh"}
        paddingTop={"30px"}
        paddingBottom={"30px"}
        marginTop={"10px"}
        marginBottom={"10px"}
      >
        {searchedNotes.map((note: any) => (
          <Flex key={note._id} shadow={"2xl"} shrink={1}>
            <Note note={note} />
          </Flex>
        ))}
      </Flex>
      <Button
        color={"black"}
        bg={"cyan.300"}
        w={"50%"}
        onClick={handleSearch}
        roundedTop={"5px"}
        roundedBottom={"0px"}
      >
        Search for a Message!
      </Button>
    </Flex>
  );
};

export default Bulletin;
