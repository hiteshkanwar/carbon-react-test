import axios from 'axios';
import * as actionTypes from './actionTypes'
import { BASE_PATH } from '../constant/app_constant';
import  { history } from '../App.js';

export  const registerUserSuccess = (response) => {
  return {
      type: actionTypes.REGISTER_USER_SUCCESS,
      payload: {
        response
      }
  }
}

export  const registerUserError = (error) => {
  return {
      type: actionTypes.REGISTER_USER_ERROR,
      payload: error
    };
}


export const registerUser = (data) => {
  return (dispatch) => {
     axios.post(`${BASE_PATH}/sign_up`, { "user": { "email": data.email, "password"  : data.password } })
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


export  const loginUserSuccess = (response) => {
  return {
      type: actionTypes.LOGIN_USER_SUCCESS,
      payload: {
        response
      }
  }
}

export  const loginUserError = (error) => {
  return {
      type: actionTypes.LOGIN_USER_ERROR,
      payload: error
    };
}


export const loginUser = (data) => {
  return (dispatch) => {
    axios.post(`${BASE_PATH}/sign_in`, { "user": { "email": data.email, "password"  : data.password } })
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




