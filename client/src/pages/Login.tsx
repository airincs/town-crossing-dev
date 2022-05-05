import React, { FC } from "react";
import {
  Flex,
  Container,
  Text,
  Grid,
  Button,
  RadioGroup,
  Radio,
  Box,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import avatars from "../components/Avatars/avatars";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login: FC = () => {
  const dispatch = useDispatch();
  const isSignUp = true;
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      avatar: avatars[0].image,
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const googleSuccess = async (res: any) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error: any) => {
    console.log(error);
    console.log("GOOGLE SIGN IN FAILURE");
  };

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
            <RadioGroup id="avatar">
              <Grid templateColumns={"repeat(5, 1fr)"} gridAutoRows={"60px"}>
                {avatars.map((avatar) => (
                  <Radio
                    key={avatar.id}
                    value={avatar.image}
                    onChange={formik.handleChange}
                  >
                    <Box w={"40px"} h={"40px"} css={{ curser: "pointer" }}>
                      <img src={avatar.image}></img>
                    </Box>
                  </Radio>
                ))}
              </Grid>
            </RadioGroup>
            <Button type={"submit"}>Submit</Button>
            <GoogleLogin
              clientId={`${process.env.REACT_APP_CLIENT_ID}`}
              render={(renderProps: any) => (
                <Button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </>
        ) : (
          <div>signin</div>
        )}
      </form>
    </Container>
  );
};

export default Login;
