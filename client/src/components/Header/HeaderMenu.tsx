import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  const [user, setUser] = useState<any>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const value = localStorage.getItem("profile");
    if (typeof value === "string") {
      const parse = JSON.parse(value);
      setUser(parse);
    }
  }, []);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
    window.location.reload();
  };

  return (
    <Menu>
      <MenuButton
        as={MotionFlex}
        justify={"center"}
        align={"center"}
        height={"5.5vh"}
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
          {user ? (
            <Link to="/usernotes">
              <MenuItem>My Notes</MenuItem>
            </Link>
          ) : null}
          <Link to="/login">
            <MenuItem>Weather</MenuItem>
          </Link>
          <Link to="/">
            <MenuItem>Home</MenuItem>
          </Link>
          {!user ? (
            <Link to="/login">
              <MenuItem fontWeight={"black"}>Login</MenuItem>
            </Link>
          ) : (
            <MenuItem onClick={logout} fontWeight={"black"}>
              Logout
            </MenuItem>
          )}
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
