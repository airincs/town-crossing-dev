import { AUTH } from '../constants/actionTypes'
import * as api from '../api/index';

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

export const signin = (signInData: any, navigate: any) => async (dispatch: any) => {
  try {
    const {data} = await api.signIn(signInData);
    dispatch({type: AUTH, data});
    navigate("/");
    window.location.reload();
  } catch (error) {
    console.log(error)
    alert("nope")
  }
}