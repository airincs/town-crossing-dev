import React, { FC } from "react";
import { useSelector } from "react-redux";
import Note from "./Note/Note";

const Bulletin: FC = () => {
  const notes = useSelector((state: any) => state.notes);
  console.log(notes);

  return (
    <React.Fragment>
      <div>Bulletin</div>
      <Note />
    </React.Fragment>
  );
};

export default Bulletin;
