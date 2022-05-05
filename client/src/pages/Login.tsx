import React, { FC } from "react";
import {
  Flex,
  Container,
  Text,
  RadioGroup,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import avatars from "../components/Avatars/avatars";
import AvatarRadio from "../components/Avatars/avatarRadio";

const Login: FC = () => {
  const isSignUp = true;

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      avatar: "",
    },
    onSubmit: (values) => {
      console.log("hi");
    },
  });

  return (
    <Container
      display={"flex"}
      justifyContent={"space-around"}
      bg={"blackAlpha.400"}
      maxW={{ base: "100vw", md: "80vw" }}
      minH={"100vh"}
    >
      <Text>{isSignUp ? "Sign Up!" : "Sign In!"}</Text>
      <form onSubmit={formik.handleSubmit}>
        {isSignUp ? (
          <>
            <label>First Name:</label>
            <input
              id="firstName"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            <label>Last Name:</label>
            <input
              id="lastName"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
            <Grid templateColumns={"repeat(5, 1fr)"} gridAutoRows={"60px"}>
              {avatars.map((avatar, key) => (
                <AvatarRadio avatar={avatar.image} />
              ))}
            </Grid>
          </>
        ) : (
          <div>signin</div>
        )}
      </form>
    </Container>
  );
};

export default Login;
