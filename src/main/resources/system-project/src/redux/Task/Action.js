import api from "../Auth/api";
import {
  ASSIGN_TASK_TO_USER_FAILURE,
  ASSIGN_TASK_TO_USER_REQUEST,
  ASSIGN_TASK_TO_USER_SUCCESS,
  CREATE_TASK_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  FETCH_TASKS_BY_ID_FAILURE,
  FETCH_TASKS_BY_ID_REQUEST,
  FETCH_TASKS_BY_ID_SUCCESS,
  FETCH_TASKS_FAILURE,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  UPDATE_TASK_STATUS_FAILURE,
  UPDATE_TASK_STATUS_REQUEST,
  UPDATE_TASK_STATUS_SUCCESS,
} from "./ActionTypes";

export const fetchTaskByProjectId = (projectId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TASKS_REQUEST });
    try {
      const response = await api.get(`/api/v1/tasks/project/${projectId}`);
      console.log("FETCH TASKS------ ", response.data);

      dispatch({ type: FETCH_TASKS_SUCCESS, tasks: response.data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_TASKS_FAILURE,
        payload: error.response ? error.response.data : "NETWORK ERROR",
      });
    }
  };
};

export const fetchTaskById = (taskId) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_TASKS_BY_ID_REQUEST });
    try {
      const response = await api.get(`/api/v1/tasks/${taskId}`);
      console.log("FETCH TASKS BY ID ", response.data);
      dispatch({ type: FETCH_TASKS_BY_ID_SUCCESS, tasks: response.data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_TASKS_BY_ID_FAILURE,
        payload: error.response ? error.response.data : "NETWORK ERROR",
      });
    }
  };
};

export const createTask = (taskData) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_TASK_REQUEST });
    try {
      const response = await api.post("/api/v1/tasks", taskData);
      console.log("CREATE TASK STATUS------ ", response.data);
      dispatch({ type: CREATE_TASK_SUCCESS, tasks: response.data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREATE_TASK_FAILURE,
        payload: error.response ? error.response.data : "NETWORK ERROR",
      });
    }
  };
};

export const updateTaskStatus = (taskId, status) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_TASK_STATUS_REQUEST });
    try {
      const response = await api.put(
        `/api/v1/tasks/${taskId}/status/${status}`
      );
      console.log("UPDATE TASK STATUS ", response.data);
      dispatch({ type: UPDATE_TASK_STATUS_SUCCESS, task: response.data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_TASK_STATUS_FAILURE,
        payload: error.response ? error.response.data : "NETWORK ERROR",
      });
    }
  };
};

export const assignedUserToTask = (taskId, userId) => {
  return async (dispatch) => {
    dispatch({ type: ASSIGN_TASK_TO_USER_REQUEST });
    try {
      const response = await api.post(
        `/api/v1/tasks/${taskId}/assignee/${userId}`
      );
      console.log("ASSIGNED TASK ------ ", response.data);
      dispatch({ type: ASSIGN_TASK_TO_USER_SUCCESS, task: response.data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ASSIGN_TASK_TO_USER_FAILURE,
        payload: error.response ? error.response.data : "NETWORK ERROR",
      });
    }
  };
};

export const deleteTask = (taskId) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_TASK_REQUEST });
    try {
      const response = await api.delete(`/api/v1/tasks/${taskId}`);
      console.log("DELETE TASK ", response.data);
      dispatch({ type: DELETE_TASK_SUCCESS, taskId });
    } catch (error) {
      console.log(error);
      dispatch({
        type: DELETE_TASK_FAILURE,
        payload: error.response ? error.response.data : "NETWORK ERROR",
      });
    }
  };
};
