import React, { FC } from "react";
import { Image, Box, GridItem } from "@chakra-ui/react";
import "./avatar.css";

type AppProps = {
  avatar: any;
};

const AvatarRadio = ({ avatar }: AppProps) => {
  return (
    <GridItem>
      <label className="labl">
        <input type="radio" name="avatar" value={avatar} />
        <Box w={"40px"} h={"40px"} css={{ curser: "pointer" }}>
          <img src={avatar}></img>
        </Box>
      </label>
    </GridItem>
  );
};

export default AvatarRadio;
