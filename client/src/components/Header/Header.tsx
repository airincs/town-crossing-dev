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
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  return (
    <Flex
      maxW={"100vw"}
      h={"100px"}
      bg={"teal.200"}
      justify={"center"}
      align={"center"}
    >
      {user ? (
        <Flex direction={"column"} w={"100px"} h={"50px"}>
          <Avatar name={user.result.username} src={user.result.avatar} />
          <Text fontSize={"xs"}>{user.result.name}</Text>
          <Button onClick={logout}>Logout</Button>
        </Flex>
      ) : (
        <Button>
          <Link to="/login">Login</Link>
        </Button>
      )}

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
