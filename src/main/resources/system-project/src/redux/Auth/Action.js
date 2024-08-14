import axios from "axios";
import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./ActionTypes";
import { API_BASE_URL } from "./api";

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/signup`,
      userData
    );
    const data = response.data;
    console.log("Signup success:", data);
    dispatch({ type: REGISTER_SUCCESS, payload: data });
  } catch (error) {
    console.error("Signup error:", error);
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response ? error.response.data : "Network Error",
    });
  }
};

export const login = (userData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/v1/auth/signing`,
      userData
    );
    const data = response.data;
    const { accessToken } = data;
    
    console.log("Signin success:", data);
    if (accessToken) {
      localStorage.setItem("jwt", accessToken);
      dispatch({ type: LOGIN_SUCCESS, payload: data });
    } else {
      dispatch({ type: LOGIN_FAILURE, payload: "No JWT token received" });
    }
  } catch (error) {
    console.error("Signin error:", error);
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response ? error.response.data : "Network Error",
    });
  }
};

export const getUser = () => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/users/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const data = response.data;
    console.log("Get user success:", data);
    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    console.error("Get user error:", error);
    dispatch({
      type: GET_USER_FAILURE,
      payload: error.response ? error.response.data : "Network Error",
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  localStorage.removeItem("jwt");
};
