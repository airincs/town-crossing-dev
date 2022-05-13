import React, { FC, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  Flex,
  Text,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  DrawerBody,
} from "@chakra-ui/react";
import NoteForm from "../NoteForm/NoteForm";
import Note from "./Note/Note";

const Bulletin: FC = () => {
  const notes = useSelector((state: any) => state.notes);
  const firstField = useRef<any>();
  const [searchFlag, setSearchFlag] = useState<boolean>(true);
  const [searchedNotes, setSearchedNotes] = useState<any>([]);
  const [searchString, setSearchString] = useState<any>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    setSearchedNotes(notes);
  }, [notes]);

  useEffect(() => {
    const newArray = filterSearch(searchedNotes, searchString);
    setSearchedNotes(newArray);
    onClose();
    return;
  }, [searchString]);

  const refresh = () => {
    window.location.reload();
  };

  const filterSearch = (array: Array<any>, string: string) => {
    return array.filter(
      (o) => o.message.includes(string) || o.title.includes(string)
    );
  };

  const formik = useFormik({
    initialValues: {
      string: "",
    },
    onSubmit: (values) => {
      setSearchFlag(false);
      setSearchString(values.string);
    },
  });

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
      {searchFlag ? (
        <Button
          color={"black"}
          bg={"cyan.300"}
          w={"50%"}
          onClick={onOpen}
          roundedTop={"5px"}
          roundedBottom={"0px"}
        >
          Search for a Message/Title!
        </Button>
      ) : (
        <Button
          color={"black"}
          bg={"cyan.300"}
          w={"50%"}
          roundedTop={"5px"}
          roundedBottom={"0px"}
          type={"button"}
          onClick={refresh}
        >
          Reset Bulletin!
        </Button>
      )}
      <Drawer
        placement={"bottom"}
        onClose={onClose}
        isOpen={isOpen}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader
            borderBottomWidth="1px"
            display={"flex"}
            justifyContent={"center"}
          >
            Search for a Message/Title!
          </DrawerHeader>
          <DrawerBody display={"flex"} justifyContent={"center"}>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <Flex align={"center"}>
                  <FormLabel>
                    <Text fontWeight={"600"}>Search Term:</Text>
                  </FormLabel>
                  <Input
                    ref={firstField}
                    id="string"
                    name="string"
                    onChange={formik.handleChange}
                    value={formik.values.string}
                    autoComplete={"off"}
                  />
                </Flex>
                <Button type="submit">Submit</Button>
              </form>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Bulletin;
