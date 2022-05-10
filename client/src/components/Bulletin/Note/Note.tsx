import React, { FC, useRef } from "react";
import {
  Box,
  Text,
  Button,
  createStandaloneToast,
  Avatar,
  Flex,
  chakra,
  BoxProps,
  useMediaQuery,
} from "@chakra-ui/react";
import { deleteNote, loveNote } from "../../../actions/notes";
import { useDispatch } from "react-redux";
import moment from "moment";
import { motion } from "framer-motion";

type AppProps = {
  note: any;
};

const Note = ({ note }: AppProps) => {
  const dispatch = useDispatch<any>();
  const user = JSON.parse(localStorage.getItem("profile")!);
  const MotionAvatar = motion<Omit<any, "transition">>(Avatar);
  const MotionFlex = motion<Omit<any, "transition">>(Flex);
  const FramerButton = chakra(motion.button);
  const [isSmall] = useMediaQuery("(min-width: 480px)");

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
    <MotionFlex
      direction={"row"}
      rounded={"25px"}
      align={"center"}
      bg={note.color}
      w={{ base: "350px", md: "500px" }}
      h={{ base: "300px", md: "150px" }}
      marginBottom={"5px"}
      gap={"5px"}
      textAlign={"center"}
      color="black"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
      initial={{ opacity: 0.3 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: "some" }}
    >
      <Flex
        width={"30%"}
        justify={"center"}
        direction={"column"}
        align={"center"}
        gap={"10px"}
      >
        <MotionAvatar
          bg={"transparent"}
          size={"lg"}
          name={note.avatar}
          src={note.avatar}
          whileHover={{ scale: 1.2 }}
        />
        <Text fontSize="md">{note.username}</Text>
        {!user?.result ? (
          <Button size={"sm"} mt={"5px"} onClick={() => NotLoggedInAlert()}>
            <Text fontSize="sm">Love: {note.loveCount.length}</Text>
          </Button>
        ) : (
          <FramerButton
            whileHover={{ scale: 1.4 }}
            bg={"cyan.300"}
            padding={"5px"}
            rounded={"25px"}
            onClick={() => dispatch(loveNote(note._id))}
          >
            <Text fontSize="xs" fontWeight={"bold"}>
              Love: {note.loveCount.length}
            </Text>
          </FramerButton>
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
    </MotionFlex>
  );
};

export default Note;
