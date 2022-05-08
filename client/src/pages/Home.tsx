import React, { FC } from "react";
import { Flex } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Note from "../components/Bulletin/Note/Note";

const Home: FC = () => {
  const notes = useSelector((state: any) => state.notes);
  const user = JSON.parse(localStorage.getItem("profile")!);

  return (
    <Flex direction={"column"} align={"center"} mt={"30px"}>
      home
    </Flex>
  );
};

export default Home;
