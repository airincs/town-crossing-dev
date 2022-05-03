import React, { FC, useState, useEffect } from "react";
import { useFormik } from "formik";
import { Flex, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { createNote } from "../../actions/notes";

const NoteForm: FC = () => {
  const [noteData, setNoteData] = useState({
    title: "",
    message: "",
    creator: "creator",
  });

  useEffect(() => {
    dispatch(createNote(noteData));
  }, [noteData]);

  const dispatch = useDispatch<any>();

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
