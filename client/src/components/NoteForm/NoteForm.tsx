import React, { FC, useState, useEffect, useRef, forwardRef } from "react";
import { useFormik, useFormikContext } from "formik";
import {
  Flex,
  Button,
  Box,
  Radio,
  RadioGroup,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  useDisclosure,
  DrawerBody,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createNote } from "../../actions/notes";

const NoteForm = () => {
  const dispatch = useDispatch<any>();
  const firstField = useRef<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = JSON.parse(localStorage.getItem("profile")!);
  const [noteData, setNoteData] = useState({
    title: "",
    message: "",
    color: "",
  });

  const useFirstRender = () => {
    const firstRender = useRef(true);
    useEffect(() => {
      firstRender.current = false;
    }, []);
    return firstRender.current;
  };

  const firstRender = useFirstRender();

  useEffect(() => {
    if (!firstRender) {
      dispatch(
        createNote({
          ...noteData,
          username: user?.result?.username,
          avatar: user?.result?.avatar,
        })
      );
    }
  }, [noteData]);

  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
      color: "red.100",
    },
    onSubmit: (values) => {
      setNoteData({
        ...noteData,
        title: values.title,
        message: values.message,
        color: values.color,
      });
    },
  });

  if (!user?.result?.username) {
    return <Box>Please Sign In to participate</Box>;
  }

  const handleSubmit = () => {
    onClose();
  };

  return (
    <>
      <Button color={"black"} onClick={onOpen}>
        Open
      </Button>
      <Drawer
        placement={"bottom"}
        onClose={onClose}
        isOpen={isOpen}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Enter!</DrawerHeader>
          <DrawerBody>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <Flex>
                  <FormLabel>Title:</FormLabel>
                  <Input
                    ref={firstField}
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                  />
                </Flex>
                <Flex>
                  <FormLabel>Message</FormLabel>
                  <Input
                    id="message"
                    name="message"
                    onChange={formik.handleChange}
                    value={formik.values.message}
                  />
                </Flex>
                <RadioGroup>
                  <Radio
                    id="color"
                    name="color"
                    value={"red.100"}
                    onChange={formik.handleChange}
                  >
                    <Box
                      bg={"red.100"}
                      w={"40px"}
                      h={"40px"}
                      rounded={"15px"}
                      css={{ curser: "pointer" }}
                    ></Box>
                  </Radio>
                  <Radio
                    id="color"
                    name="color"
                    value={"green.100"}
                    onChange={formik.handleChange}
                  >
                    <Box
                      bg={"green.100"}
                      w={"40px"}
                      h={"40px"}
                      rounded={"15px"}
                      css={{ curser: "pointer" }}
                    ></Box>
                  </Radio>
                  <Radio
                    id="color"
                    name="color"
                    value={"teal.100"}
                    onChange={formik.handleChange}
                  >
                    <Box
                      bg={"teal.100"}
                      w={"40px"}
                      h={"40px"}
                      rounded={"15px"}
                      css={{ curser: "pointer" }}
                    ></Box>
                  </Radio>
                  <Radio
                    id="color"
                    name="color"
                    value={"purple.100"}
                    onChange={formik.handleChange}
                  >
                    <Box
                      bg={"purple.100"}
                      w={"40px"}
                      h={"40px"}
                      rounded={"15px"}
                      css={{ curser: "pointer" }}
                    ></Box>
                  </Radio>
                </RadioGroup>
                <Button type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </form>
              <Button onClick={() => console.log(noteData)}>Show State</Button>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NoteForm;
