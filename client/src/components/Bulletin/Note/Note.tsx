import React, { FC } from "react";
import { Box, Text } from "@chakra-ui/react";
import moment from "moment";

type AppProps = {
  note: any;
};

const Note = ({ note }: AppProps) => {
  return (
    <Box w={"100px"} h={"100px"}>
      <Text fontSize="xs">Title: {note.title} </Text>
      <Text fontSize="xs">Message: {note.message}</Text>
      <Text fontSize="xs">By: {note.creator}</Text>
      <Text fontSize="xs">{moment(note.timeCreated).fromNow()}</Text>
      <Text fontSize="xs">Love: {note.loveCount}</Text>
    </Box>
  );
};

export default Note;
