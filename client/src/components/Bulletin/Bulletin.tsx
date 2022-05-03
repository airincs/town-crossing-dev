import React, { FC } from "react";
import { useSelector } from "react-redux";
import { Progress } from "@chakra-ui/react";
import Note from "./Note/Note";

const Bulletin: FC = () => {
  const notes = useSelector((state: any) => state.notes);
  console.log(notes);

  return (
    <React.Fragment>
      <div>Bulletin</div>
      <div>
        {notes.map((note: any) => (
          <div key={note._id}>
            <Note note={note} />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Bulletin;
