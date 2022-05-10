import { AUTH } from '../constants/actionTypes'
import * as api from '../api/index';
import { createStandaloneToast } from '@chakra-ui/react';

export const signup = (signUpData: any, navigate: any) => async (dispatch: any) => {
  try {
    const {data} = await api.signUp(signUpData);
    dispatch({type: AUTH, data});
    navigate("/");
    window.location.reload();
  } catch (error) {
    console.log(error)
    alert("Nope")
  }
}

const noUsernameAlert = () => {
  const toast = createStandaloneToast();
  return toast({
    title: "Username + Password not Found!",
    status: "error",
    duration: 3000,
    isClosable: true,
  });
};

export const signin = (signInData: any, navigate: any) => async (dispatch: any) => {
  try {
    const {data} = await api.signIn(signInData);
    dispatch({type: AUTH, data});
    navigate("/");
    window.location.reload();
  } catch (error) {
    console.log(error)
    noUsernameAlert()
  }
}