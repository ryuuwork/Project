import api from "../Auth/api";
import {
  FETCH_CHAT_BY_PROJECT_FAILURE,
  FETCH_CHAT_BY_PROJECT_REQUEST,
  FETCH_CHAT_BY_PROJECT_SUCCESS,
  FETCH_CHAT_MESSAGES_FAILURE,
  FETCH_CHAT_MESSAGES_REQUEST,
  FETCH_CHAT_MESSAGES_SUCCESS,
  SEND_MESSAGE_FAILURE,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
} from "./ActionTypes";

export const sendMessage = (messageData) => {
  return async (dispatch) => {
    dispatch({ type: SEND_MESSAGE_REQUEST });
    try {
      const response = await api.post("/api/v1/messages/send", messageData);
      console.log("SEND MESSAGE -----", response.data);
      dispatch({ type: SEND_MESSAGE_SUCCESS, message: response.data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: SEND_MESSAGE_FAILURE,
        payload: error.response ? error.response.data : "SEND MESSAGE FAILURE",
      });
    }
  };
};

export const fetchChatByProject = (projectId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CHAT_BY_PROJECT_REQUEST });
    try {
      const response = await api.get(`/api/v1/projects/${projectId}/chat`);
      dispatch({ type: FETCH_CHAT_BY_PROJECT_SUCCESS, chat: response.data });
      console.log("fetchChatByProject -----", response.data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_CHAT_BY_PROJECT_FAILURE,
        payload: error.response
          ? error.response.data
          : "Fetch Chat By Project Failure",
      });
    }
  };
};

export const fetchChatMessages = (projectId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_CHAT_MESSAGES_REQUEST });
    try {
      const response = await api.get(`/api/v1/messages/chat/${projectId}`);
      dispatch({
        type: FETCH_CHAT_MESSAGES_SUCCESS,
        projectId,
        chat: response.data,
      });
      console.log("fetch chat messages", response.data);
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_CHAT_MESSAGES_FAILURE,
        payload: error.response
          ? error.response.data
          : "Fetch Chat Messages Failure",
      });
    }
  };
};
