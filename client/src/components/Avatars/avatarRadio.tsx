import React, { FC } from "react";
import { Image, Box, GridItem } from "@chakra-ui/react";

type AppProps = {
  avatar: any;
};

const AvatarRadio = ({ avatar }: AppProps) => {
  return (
    <GridItem>
      <Box w={"40px"} h={"40px"} css={{ curser: "pointer" }}>
        <Image src={avatar}></Image>
      </Box>
    </GridItem>
  );
};

export default AvatarRadio;
