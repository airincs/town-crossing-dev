import React, { FC } from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header: FC = () => {
  return (
    <Flex
      maxW={"100vw"}
      h={"60px"}
      bg={"teal.200"}
      justify={"center"}
      align={"center"}
    >
      <Button>Login</Button>
      <Button>
        <Link to="/">Home</Link>
      </Button>
      <Button>
        <Link to="/bulletin">Bulletin</Link>
      </Button>
    </Flex>
  );
};

export default Header;
