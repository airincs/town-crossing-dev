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

const UserBulletin: FC = () => {
  const notes = useSelector((state: any) => state.notes);
  const [user, setUser] = useState<any>();
  const [searchedNotes, setSearchedNotes] = useState<any>([]);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    const value = localStorage.getItem("profile");
    if (typeof value === "string") {
      const parse = JSON.parse(value);
      setUser(parse);
    }
  }, []);

  useEffect(() => {
    setSearchedNotes(notes);
  }, [notes]);

  const filterSearch = (array: Array<any>, string: string) => {
    return array.filter((o) => o.username.includes(string));
  };

  const handleSearch = () => {
    const newArray = filterSearch(searchedNotes, `${user.result.username}`);
    console.log(user);
    setSearchedNotes(newArray);
    return;
  };

  return (
    <Flex
      direction={"column"}
      align={"center"}
      width={{ base: "100vw", md: "80vw" }}
    >
      <Button onClick={handleSearch}>search</Button>
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

export default UserBulletin;
