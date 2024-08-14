import api from "../Auth/api";
import {
  CREATE_COMMENT_FAILURE,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  FETCH_COMMENTS_FAILURE,
  FETCH_COMMENTS_REQUEST,
  FETCH_COMMENTS_SUCCESS,
} from "./ActionTypes";

export const createComment = (commentData, taskId) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_COMMENT_REQUEST });
    try {
      const response = await api.post("/api/v1/comments", {
        content: commentData,
        taskId,
      });
      console.log("CREATE COMMENTS ------", response.data);
      dispatch({ type: CREATE_COMMENT_SUCCESS, comment: response.data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREATE_COMMENT_FAILURE,
        payload: error.response
          ? error.response.data
          : "Create Comment Failure",
      });
    }
  };
};

export const fetchComments = (taskId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_COMMENTS_REQUEST });
    try {
      const response = await api.get(`/api/v1/comments/${taskId}`);
      console.log("FETCH COMMENTS ------", response.data);
      dispatch({ type: FETCH_COMMENTS_SUCCESS, comment: response.data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_COMMENTS_FAILURE,
        payload: error.response
          ? error.response.data
          : "Create Comment Failure",
      });
    }
  };
};

export const deleteComment = (commentId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_COMMENT_REQUEST });
    try {
      await api.delete(`/api/v1/comments/${commentId}`);
      dispatch({ type: DELETE_COMMENT_SUCCESS, commentId });
    } catch (error) {
      console.error("Delete Comment Error:", error);
      dispatch({
        type: DELETE_COMMENT_FAILURE,
        payload: error.response ? error.response.data : "Delete Comment Failure",
      });
    }
  };
};