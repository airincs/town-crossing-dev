import React, { FC, useState, useEffect } from "react";
import { Flex, Button, Avatar, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { motion } from "framer-motion";

const Header: FC = () => {
  const [user, setUser] = useState<any>();
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
      h={"5vh"}
      bg={"gray.700"}
      justify={"center"}
      align={"center"}
      gap={"10px"}
      shadow={"lg"}
    >
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
      {user ? (
        <>
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
          <Flex w={"100px"} align={"center"} mr={"30px"} ml={"auto"}>
            <Avatar
              bg={"transparent"}
              size={"md"}
              name={user.result.avatar}
              src={user.result.avatar}
            />
            <Text fontSize={"xs"}>{user.result.username}</Text>
          </Flex>
          <MotionFlex
            justify={"center"}
            align={"center"}
            height={"40px"}
            rounded={"5px"}
            w={"100px"}
            bg={"cyan.500"}
            onClick={logout}
            mr={"30px"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
          >
            <Text fontWeight={"bold"}>Logout</Text>
          </MotionFlex>
        </>
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
          >
            <Text fontWeight={"bold"}>Login</Text>
          </MotionFlex>
        </Link>
      )}
    </Flex>
  );
};

export default Header;
