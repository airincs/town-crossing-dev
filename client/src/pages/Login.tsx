import React, { FC, useState, useEffect, useRef } from "react";
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
import { signin, signup } from "../actions/auth";

const Login: FC = () => {
  const [signUpStatus, setSignUpStatus] = useState(true);
  const [signInData, setSignInData] = useState<any>(null);
  const [signUpData, setSignUpData] = useState<any>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signUpStatusToggle = () => {
    if (signUpStatus) setSignUpStatus(false);
    else setSignUpStatus(true);
  };

  const useFirstRender = () => {
    const firstRender = useRef(true);
    useEffect(() => {
      firstRender.current = false;
    }, []);
    return firstRender.current;
  };

  const firstRender = useFirstRender();

  useEffect(() => {
    if (!firstRender) {
      dispatch<any>(signup(signUpData, navigate));
    }
  }, [signUpData]);

  useEffect(() => {
    if (!firstRender) {
      dispatch<any>(signin(signInData, navigate));
    }
  }, [signInData]);

  const formik = useFormik({
    initialValues: {
      username: "",
      avatar: avatars[0].image,
      password: "",
      confirmPassword: "",
    },
    onSubmit: (values) => {
      if (signUpStatus) {
        setSignUpData({
          ...signUpData,
          username: values.username,
          password: values.password,
          avatar: values.avatar,
        });
        //dispatch<any>(signup(signUpData, navigate));
        console.log("this is key: ", values.avatar);
      } else {
        setSignInData({
          ...signInData,
          username: values.username,
          password: values.password,
        });
        //dispatch<any>(signin(signInData, navigate));
        console.log("sign in: ", values.username);
      }
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
      <Text>{signUpStatus ? "Sign Up!" : "Sign In!"}</Text>
      <form onSubmit={formik.handleSubmit}>
        {signUpStatus ? (
          <>
            <label>Username:</label>
            <input
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <label>Password:</label>
            <input
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <label>Confirm Password:</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
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
                      <img src={avatar.image} />
                    </Box>
                  </Radio>
                ))}
              </Grid>
            </RadioGroup>
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
          <Flex direction={"column"}>
            <label>Username:</label>
            <input
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <label>Password:</label>
            <input
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <label>Confirm Password:</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
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
          </Flex>
        )}
        <Button type={"submit"}>Submit</Button>
      </form>
      <Button
        onClick={() => {
          signUpStatusToggle();
        }}
      >
        {signUpStatus ? "Click to sign in!" : "Click to sign up!"}
      </Button>
    </Container>
  );
};

export default Login;
