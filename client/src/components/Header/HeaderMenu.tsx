import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Text,
  MenuDivider,
} from "@chakra-ui/react";

const HeaderMenu = () => {
  const MotionFlex = motion<Omit<any, "transition">>(Flex);
  return (
    <Menu>
      <MenuButton
        as={MotionFlex}
        justify={"center"}
        align={"center"}
        height={"4vh"}
        rounded={"5px"}
        w={"100px"}
        bg={"cyan.500"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.1 }}
        mr={"10px"}
      >
        <Text fontWeight={"bold"} align="center">
          Menu
        </Text>
      </MenuButton>
      <MenuList>
        <MenuGroup title="Navigation">
          <Link to="/bulletin">
            <MenuItem>Bulletin</MenuItem>
          </Link>
          <Link to="/login">
            <MenuItem>Login</MenuItem>
          </Link>
          <Link to="/login">
            <MenuItem>Login</MenuItem>
          </Link>
          <Link to="/">
            <MenuItem>Home</MenuItem>
          </Link>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup>
          <a href="https://github.com/airincs">
            <MenuItem>GitHub</MenuItem>
          </a>
          <a href="https://github.com/airincs">
            <MenuItem>LinkedIn</MenuItem>
          </a>
          <MenuItem
            onClick={() => {
              navigator.clipboard.writeText("airincompsci@gmail.com");
            }}
          >
            <Text>Email (Click To Copy)</Text>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
};

export default HeaderMenu;
