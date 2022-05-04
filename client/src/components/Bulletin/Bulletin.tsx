import React, { FC, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Flex } from "@chakra-ui/react";
import NoteForm from "../NoteForm/NoteForm";
import Note from "./Note/Note";
import { deleteNote } from "../../actions/notes";

const Bulletin: FC = () => {
  const notes = useSelector((state: any) => state.notes);
  const [currentNoteId, setCurrentNoteId] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<any>();
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(deleteNote(deleteId));
  }, [deleteId]);

  return (
    <Flex>
      <Flex direction={"column"}>
        <div>Bulletin</div>
        <div>
          {notes.map((note: any) => (
            <div key={note._id}>
              <Note note={note} />
              <Button
                size={"xs"}
                onClick={() => {
                  setDeleteId(note._id);
                }}
              >
                Delete Note
              </Button>
            </div>
          ))}
        </div>
      </Flex>
      <Flex>
        <NoteForm
          currentNoteId={currentNoteId}
          setCurrentNoteId={setCurrentNoteId}
        />
      </Flex>
    </Flex>
  );
};

export default Bulletin;
