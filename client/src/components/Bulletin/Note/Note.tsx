import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import moment from "moment";

type AppProps = {
  note: any;
};

const Note = ({ note }: AppProps) => {
  return (
    <Box w={"100px"} h={"100px"}>
      <Text fontSize="xs">{note.title} </Text>
      <Text fontSize="xs">{note.message}</Text>
      <Text fontSize="xs">{note.creator}</Text>
      <Text fontSize="xs">{moment(note.timeCreated).fromNow()}</Text>
      <Text fontSize="xs">{note.loveCount}</Text>
    </Box>
  );
};

export default Note;
