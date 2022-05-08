import React, { FC, useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { Flex, Button, Box, Radio, RadioGroup } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createNote } from "../../actions/notes";

const NoteForm: FC = () => {
  const dispatch = useDispatch<any>();
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

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Flex>
          <label>Title:</label>
          <input
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
        </Flex>
        <Flex>
          <label>Message</label>
          <input
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
        <Button type="submit">Submit</Button>
      </form>
      <Button onClick={() => console.log(noteData)}>Show State</Button>
    </div>
  );
};

export default NoteForm;
