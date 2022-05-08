import React, { FC } from "react";
import { Box, Text, Button, createStandaloneToast } from "@chakra-ui/react";
import { deleteNote, loveNote } from "../../../actions/notes";
import { useDispatch } from "react-redux";
import moment from "moment";

type AppProps = {
  note: any;
};

const Note = ({ note }: AppProps) => {
  const dispatch = useDispatch<any>();
  const user = JSON.parse(localStorage.getItem("profile")!);

  const NotLoggedInAlert = () => {
    const toast = createStandaloneToast();
    return toast({
      title: "Can not love!",
      description: "Must log in to love a post!",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box w={"100px"} h={"100px"} marginBottom={"45px"}>
      <Text fontSize="xs">Title: {note.title} </Text>
      <Text fontSize="xs">Message: {note.message}</Text>
      <Text fontSize="xs">By: {note.username}</Text>
      <Text fontSize="xs">{moment(note.timeCreated).fromNow()}</Text>
      {!user?.result ? (
        <Button size={"xs"} onClick={() => NotLoggedInAlert()}>
          <Text fontSize="xs">Love: {note.loveCount.length}</Text>
        </Button>
      ) : (
        <Button size={"xs"} onClick={() => dispatch(loveNote(note._id))}>
          <Text fontSize="xs">Love: {note.loveCount.length}</Text>
        </Button>
      )}
      {(user?.result?.googleId == note?.creator ||
        user?.result?._id == note?.creator) && (
        <Button
          size={"xs"}
          marginTop={"5px"}
          onClick={() => {
            dispatch(deleteNote(note._id));
          }}
        >
          Delete Note!
        </Button>
      )}
    </Box>
  );
};

export default Note;
