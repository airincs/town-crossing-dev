import React, { FC, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex } from "@chakra-ui/react";
import NoteForm from "../NoteForm/NoteForm";
import Note from "./Note/Note";

const Bulletin: FC = () => {
  const notes = useSelector((state: any) => state.notes);
  const [currentNoteId, setCurrentNoteId] = useState<any>(null);
  const dispatch = useDispatch<any>();

  return (
    <Flex>
      <Flex direction={"column"}>
        <div>Bulletin</div>
        <Flex direction={"column-reverse"}>
          {notes.map((note: any) => (
            <div key={note._id}>
              <Note note={note} />
            </div>
          ))}
        </Flex>
      </Flex>
      <Flex>
        <NoteForm />
      </Flex>
    </Flex>
  );
};

export default Bulletin;
