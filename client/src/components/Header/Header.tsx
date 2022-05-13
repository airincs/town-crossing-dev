import React, { FC, useState, useEffect } from "react";
import { Flex, Button, Avatar, Text, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { motion } from "framer-motion";
import HeaderMenu from "./HeaderMenu";

const Header: FC = () => {
  const [user, setUser] = useState<any>();
  const [isLargerThan768] = useMediaQuery("(min-width:768px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const MotionFlex = motion<Omit<any, "transition">>(Flex);

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

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken: any = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
  });

  return (
    <Flex
      maxW={"100vw"}
      minH={"5vh"}
      bg={"gray.700"}
      gap={"20px"}
      shadow={"lg"}
      shrink={0}
    >
      {isLargerThan768 ? (
        <Flex justify={"space-between"} align={"center"} w={"100%"}>
          <Flex gap={"20px"} ml={"50px"}>
            <Link to="/">
              <MotionFlex
                justify={"center"}
                align={"center"}
                height={"40px"}
                rounded={"5px"}
                w={"100px"}
                bg={"cyan.500"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
              >
                <Text fontWeight={"bold"}>Home</Text>
              </MotionFlex>
            </Link>
            <Link to="/bulletin">
              <MotionFlex
                justify={"center"}
                align={"center"}
                height={"40px"}
                rounded={"5px"}
                w={"100px"}
                bg={"cyan.300"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
              >
                <Text fontWeight={"bold"}>Bulletin</Text>
              </MotionFlex>
            </Link>
          </Flex>
          {user ? (
            <Flex align={"center"} gap={"20px"} mr={"50px"}>
              <MotionFlex
                justify={"center"}
                align={"center"}
                height={"40px"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
              >
                <Avatar
                  bg={"transparent"}
                  size={"md"}
                  name={user.result.avatar}
                  src={user.result.avatar}
                />
                <Text fontSize={"2xl"} fontWeight={"300"} color={"cyan.300"}>
                  {user.result.username}
                </Text>
              </MotionFlex>
              <Link to="/usernotes">
                <MotionFlex
                  justify={"center"}
                  align={"center"}
                  height={"40px"}
                  rounded={"5px"}
                  w={"100px"}
                  bg={"cyan.300"}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1.1 }}
                >
                  <Text fontWeight={"bold"}>My Notes</Text>
                </MotionFlex>
              </Link>
              <MotionFlex
                justify={"center"}
                align={"center"}
                height={"40px"}
                rounded={"5px"}
                w={"100px"}
                bg={"cyan.500"}
                onClick={logout}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
              >
                <Text fontWeight={"bold"}>Logout</Text>
              </MotionFlex>
            </Flex>
          ) : (
            <Link to="/login">
              <MotionFlex
                justify={"center"}
                align={"center"}
                height={"40px"}
                rounded={"5px"}
                w={"100px"}
                bg={"cyan.500"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 1.1 }}
                mr={"50px"}
              >
                <Text fontWeight={"bold"}>Login</Text>
              </MotionFlex>
            </Link>
          )}
        </Flex>
      ) : (
        <Flex justify={"space-between"} align={"center"} w={"100%"} h={"5vh"}>
          <Flex ml={"10px"}>
            <Text color={"white"}>Town Crossing</Text>
          </Flex>
          <Flex mr={"10px"}>
            <HeaderMenu />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default Header;
