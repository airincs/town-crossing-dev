import React, { FC, useState, useEffect, useRef } from "react";
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
        <div>
          {notes.map((note: any) => (
            <div key={note._id}>
              <Note note={note} />
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
