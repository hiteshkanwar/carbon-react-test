import axios from 'axios';
import * as actionTypes from './actionTypes'
import { BASE_PATH } from '../constant/app_constant';
import  { history } from '../App';

export  const registerUserSuccess = (response:any) => {
  return {
      type: actionTypes.REGISTER_USER_SUCCESS,
      payload: {
        response
      }
  }
}

export  const registerUserError = (error:any) => {
  return {
      type: actionTypes.REGISTER_USER_ERROR,
      payload: error
    };
}


export const registerUser = (email:string, password:string) => {
  return (dispatch) => {
     axios.post(`${BASE_PATH}/sign_up`, { "user": { "email": email, "password"  : password } })
        .then(function (response) {
          sessionStorage.setItem('user',JSON.stringify(response.data.data.user))
          dispatch(registerUserSuccess(response.data))
          history.push('/dashboard');
       })
      .catch(function(error){
        dispatch(registerUserError(error.message))
      })
  }
}


export  const loginUserSuccess = (response:any) => {
  return {
      type: actionTypes.LOGIN_USER_SUCCESS,
      payload: {
        response
      }
  }
}

export  const loginUserError = (error:any) => {
  return {
      type: actionTypes.LOGIN_USER_ERROR,
      payload: error
    };
}


export const loginUser = (email:string, password:string) => {
  return (dispatch) => {
    axios.post(`${BASE_PATH}/sign_in`, { "user": { "email": email, "password"  : password } })
      .then(function (response) {
        sessionStorage.setItem('user',JSON.stringify(response.data.data.user))
        dispatch(loginUserSuccess(response.data))
        history.push('/dashboard');
     })
    .catch(function(error){
      dispatch(loginUserError(error.message))
    })
  }
}




