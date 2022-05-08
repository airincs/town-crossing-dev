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
  FormLabel,
  Heading,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import avatars from "../components/Avatars/avatars";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../actions/auth";
import * as Yup from "yup";

const Login: FC = () => {
  const [signUpStatus, setSignUpStatus] = useState(false);
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
      avatar: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(4, "Username must be at least 4 characters long!")
        .required("Username is required!"),
      avatar: Yup.string().required("An avatar selection is required!"),
      password: Yup.string()
        .min(4, "Password must be at least 6 characters long!")
        .required("A Password is required!"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match!")
        .required("A confirmed Password is required!"),
    }),
    onSubmit: (values) => {
      if (signUpStatus) {
        setSignUpData({
          ...signUpData,
          username: values.username,
          password: values.password,
          avatar: values.avatar,
        });
      } else {
        setSignInData({
          ...signInData,
          username: values.username,
          password: values.password,
        });
      }
    },
  });

  return (
    <Container
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      paddingBottom={"10vh"}
      bg={"blackAlpha.400"}
      maxW={{ base: "100vw", md: "80vw" }}
      minH={"90vh"}
    >
      <Box maxW={"320px"}>
        <Flex justify={"center"}>
          <Text>{signUpStatus ? "SIGN UP!" : "SIGN IN!"}</Text>
        </Flex>
        <form onSubmit={formik.handleSubmit}>
          {signUpStatus ? (
            <>
              <Flex direction={"column"} maxW={"320px"}>
                <FormLabel marginTop={"20px"}>Username:</FormLabel>
                <input
                  id="username"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username ? (
                  <Heading color={"blackAlpha.900"} fontSize={"sm"}>
                    {formik.errors.username}
                  </Heading>
                ) : null}
                <FormLabel marginTop={"20px"}>Password:</FormLabel>
                <input
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ? (
                  <Heading color={"blackAlpha.900"} fontSize={"sm"}>
                    {formik.errors.password}
                  </Heading>
                ) : null}
                <FormLabel marginTop={"20px"}>Confirm Password:</FormLabel>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <Heading color={"blackAlpha.900"} fontSize={"sm"}>
                    {formik.errors.confirmPassword}
                  </Heading>
                ) : null}
              </Flex>
              <RadioGroup id="avatar">
                <Grid templateColumns={"repeat(5, 1fr)"} gridAutoRows={"60px"}>
                  {avatars.map((avatar) => (
                    <Radio
                      id="avatar"
                      name="avatar"
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
              {formik.touched.avatar && formik.errors.avatar ? (
                <Heading color={"blackAlpha.900"} fontSize={"sm"} w={"320px"}>
                  {formik.errors.avatar}
                </Heading>
              ) : null}
            </>
          ) : (
            <Flex direction={"column"}>
              <FormLabel marginTop={"20px"}>Username:</FormLabel>
              <input
                id="username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <Heading color={"blackAlpha.900"} fontSize={"sm"}>
                  {formik.errors.username}
                </Heading>
              ) : null}
              <FormLabel marginTop={"20px"}>Password:</FormLabel>
              <input
                id="password"
                name="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <Heading color={"blackAlpha.900"} fontSize={"sm"}>
                  {formik.errors.password}
                </Heading>
              ) : null}
            </Flex>
          )}
          <Button
            bg={"red.300"}
            type={"submit"}
            w={"full"}
            mb={"10px"}
            marginTop={"20px"}
            color={"white"}
          >
            SUBMIT!
          </Button>

          <Button
            w={"full"}
            bg={"red.500"}
            color={"white"}
            onClick={() => {
              signUpStatusToggle();
            }}
          >
            {signUpStatus ? "SIGN IN INSTEAD" : "SIGN UP INSTEAD"}
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
