import React, { FC, useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { Flex, Button, Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createNote } from "../../actions/notes";

type AppProps = {
  currentNoteId: any;
  setCurrentNoteId: any;
};

const NoteForm = ({ currentNoteId, setCurrentNoteId }: AppProps) => {
  const dispatch = useDispatch<any>();
  const user = JSON.parse(localStorage.getItem("profile")!);
  console.log(user.result.username);
  const [noteData, setNoteData] = useState({
    title: "",
    message: "",
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
      dispatch(createNote({ ...noteData, username: user?.result?.username }));
    }
  }, [noteData]);

  const formik = useFormik({
    initialValues: {
      title: "",
      message: "",
    },
    onSubmit: (values) => {
      setNoteData({
        ...noteData,
        title: values.title,
        message: values.message,
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
        <Button type="submit">Submit</Button>
      </form>
      <Button onClick={() => console.log(noteData)}>Show State</Button>
    </div>
  );
};

export default NoteForm;
