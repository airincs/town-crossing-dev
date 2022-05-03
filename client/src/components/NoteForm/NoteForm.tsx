import React, { FC, useState, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { Flex, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createNote } from "../../actions/notes";

const NoteForm: FC = () => {
  const dispatch = useDispatch<any>();
  const [noteData, setNoteData] = useState({
    title: "",
    message: "",
    creator: "creator",
  });

  const useFirstRender = () => {
    const firstRender = useRef(true);
    useEffect(() => {
      firstRender.current = false;
    }, []);
    return firstRender.current;
  };

  const firstRender = useFirstRender();
  const dispatchRef = useRef(null);

  useEffect(() => {
    if (!firstRender) {
      console.log(noteData);
      dispatch(createNote(noteData));
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
        creator: "creator",
      });
    },
  });

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
