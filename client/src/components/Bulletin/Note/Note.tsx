import React, { FC } from "react";
import {
  Box,
  Text,
  Button,
  createStandaloneToast,
  Avatar,
  Flex,
} from "@chakra-ui/react";
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
    <Flex
      direction={"row"}
      rounded={"25px"}
      align={"center"}
      bg={note.color}
      w={"500px"}
      h={"150px"}
      marginBottom={"5px"}
      gap={"5px"}
      textAlign={"center"}
      color="black"
    >
      <Flex
        width={"30%"}
        justify={"center"}
        direction={"column"}
        align={"center"}
        gap={"10px"}
      >
        <Avatar
          bg={"transparent"}
          size={"lg"}
          name={note.avatar}
          src={note.avatar}
        />
        <Text fontSize="md">{note.username}</Text>
        {!user?.result ? (
          <Button size={"sm"} mt={"5px"} onClick={() => NotLoggedInAlert()}>
            <Text fontSize="sm">Love: {note.loveCount.length}</Text>
          </Button>
        ) : (
          <Button size={"xs"} onClick={() => dispatch(loveNote(note._id))}>
            <Text fontSize="xs">Love: {note.loveCount.length}</Text>
          </Button>
        )}
      </Flex>
      <Flex
        direction={"row"}
        align={"flex-start"}
        justify={"flex-start"}
        width={"70%"}
        maxH={"100px"}
      >
        <Flex direction={"column"}>
          <Text fontSize="xl" fontWeight={"600"} height={"30px"}>
            {note.title}
          </Text>
          <Text fontSize="sm">{note.message}</Text>

          <Text fontSize="xs">{moment(note.timeCreated).fromNow()}</Text>
        </Flex>
        {(user?.result?.googleId === note?.creator ||
          user?.result?._id === note?.creator) && (
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
      </Flex>
    </Flex>
  );
};

export default Note;
