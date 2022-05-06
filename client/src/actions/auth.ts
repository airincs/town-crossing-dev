import { AUTH } from '../constants/actionTypes'
import * as api from '../api/index';

export const signup = (signUpData: any, navigate: any) => async (dispatch: any) => {
  try {
    const {data} = await api.signUp(signUpData);
    dispatch({type: AUTH, data});
    navigate("/");
  } catch (error) {
    console.log(error)
  }
}

export const signin = (signInData: any, navigate: any) => async (dispatch: any) => {
  try {
    const {data} = await api.signIn(signInData);
    dispatch({type: AUTH, data});
    navigate("/");
  } catch (error) {
    console.log(error)
  }
}