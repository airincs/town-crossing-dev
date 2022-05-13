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
  Text,
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
    return (
      <Box bottom={4} position={"absolute"}>
        Please Sign In to Post a Note
      </Box>
    );
  }

  const handleSubmit = () => {
    onClose();
  };

  return (
    <>
      <Button
        color={"black"}
        bg={"cyan.500"}
        onClick={onOpen}
        w={"50%"}
        position="absolute"
        bottom={4}
        roundedTop={"0px"}
        roundedBottom={"5px"}
      >
        Post a Note!
      </Button>
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
            Post a Note on the Bulletin!
          </DrawerHeader>
          <DrawerBody display={"flex"} justifyContent={"center"}>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <Flex align={"center"}>
                  <FormLabel>
                    <Text fontWeight={"600"}>Title:</Text>
                  </FormLabel>
                  <Input
                    ref={firstField}
                    id="title"
                    name="title"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    autoComplete={"off"}
                  />
                </Flex>
                <Flex align={"center"}>
                  <FormLabel>
                    <Text fontWeight={"600"}>Message:</Text>
                  </FormLabel>
                  <Input
                    id="message"
                    name="message"
                    onChange={formik.handleChange}
                    value={formik.values.message}
                    autoComplete={"off"}
                  />
                </Flex>
                <Flex justify={"center"}>
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
                </Flex>
                <Button type="submit" onClick={handleSubmit} w={"100%"}>
                  Submit
                </Button>
              </form>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NoteForm;
