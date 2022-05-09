import React, { FC, useState, useEffect } from "react";
import { Flex, Button, Avatar, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const Header: FC = () => {
  const [user, setUser] = useState<any>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
      <Button h={"90%"} roundedLeft={"25px"} w={"100px"} bg={"cyan.300"}>
        <Link to="/">Home</Link>
      </Button>
      <Button h={"90%"} w={"100px"} bg={"cyan.300"}>
        <Link to="/bulletin">Bulletin</Link>
      </Button>
      {user ? (
        <>
          <Flex direction={"column"} w={"100px"} align={"center"}>
            <Avatar
              bg={"transparent"}
              size={"md"}
              name={user.result.avatar}
              src={user.result.avatar}
            />
            <Text fontSize={"xs"}>{user.result.username}</Text>
          </Flex>
          <Button h={"90px"} onClick={logout} bg={"cyan.300"} w={"100px"}>
            Logout
          </Button>{" "}
        </>
      ) : (
        <Button h={"90%"} roundedRight={"25px"} w={"100px"} bg={"cyan.300"}>
          <Link to="/login">Login</Link>
        </Button>
      )}
    </Flex>
  );
};

export default Header;
