import api from "../Auth/api";
import {
  ACCEPT_PROJECT_INVITE_FAILURE,
  ACCEPT_PROJECT_INVITE_REQUEST,
  ACCEPT_PROJECT_INVITE_SUCCESS,
  CREATE_PROJECT_FAILURE,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECT_BY_ID_FAILURE,
  FETCH_PROJECT_BY_ID_REQUEST,
  FETCH_PROJECT_BY_ID_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  INVITE_TO_PROJECT_FAILURE,
  INVITE_TO_PROJECT_REQUEST,
  INVITE_TO_PROJECT_SUCCESS,
  SEARCH_PROJECT_FAILURE,
  SEARCH_PROJECT_REQUEST,
  SEARCH_PROJECT_SUCCESS,
} from "./ActionTypes";

export const fetchProjects =
  ({ category, tag }) =>
  async (dispatch) => {
    dispatch({ type: FETCH_PROJECTS_REQUEST });
    try {
      const { data } = await api.get("/api/v1/projects", {
        params: { category, tag },
      });
      console.log("all projects --------", data);
      dispatch({ type: FETCH_PROJECTS_SUCCESS, projects: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: FETCH_PROJECTS_FAILURE,
        payload: error.response ? error.response.data : "Network Error",
      });
    }
  };

export const searchProject = (keyword) => async (dispatch) => {
  dispatch({ type: SEARCH_PROJECT_REQUEST });
  try {
    const { data } = await api.get(
      "/api/v1/projects/search?keyword=" + keyword
    );
    console.log("seach project ", data);
    dispatch({ type: SEARCH_PROJECT_SUCCESS, projects: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: SEARCH_PROJECT_FAILURE,
      payload: error.response ? error.response.data : "Network Error",
    });
  }
};

export const createProject = (projectData) => async (dispatch) => {
  dispatch({ type: CREATE_PROJECT_REQUEST });
  try {
    const { data } = await api.post("/api/v1/projects", projectData);
    console.log("create project-------- ", data);
    dispatch({ type: CREATE_PROJECT_SUCCESS, project: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_PROJECT_FAILURE,
      payload: error.response ? error.response.data : "Network Error",
    });
  }
};

export const fetchProjectById = (id) => async (dispatch) => {
  dispatch({ type: FETCH_PROJECT_BY_ID_REQUEST });
  try {
    const { data } = await api.get(`/api/v1/projects/${id}`);
    console.log("fetch project by id -------- ", data);
    dispatch({ type: FETCH_PROJECT_BY_ID_SUCCESS, project: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FETCH_PROJECT_BY_ID_FAILURE,
      payload: error.response ? error.response.data : "Network Error",
    });
  }
};

export const deleteProjectById = (projectId) => async (dispatch) => {
  dispatch({ type: DELETE_PROJECT_REQUEST });
  try {
    const { data } = await api.delete("/api/v1/projects/" + projectId);
    console.log("delete project by id------ ", data);
    dispatch({ type: DELETE_PROJECT_SUCCESS, projectId });
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_PROJECT_FAILURE,
      payload: error.response ? error.response.data : "Network Error",
    });
  }
};

export const inviteToProjectById = (email, projectId) => async (dispatch) => {
  dispatch({ type: INVITE_TO_PROJECT_REQUEST });
  try {
    const { data } = await api.post("/api/v1/projects/invite", {
      email,
      projectId,
    });
    console.log("invite project ", data);
    dispatch({ type: INVITE_TO_PROJECT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: INVITE_TO_PROJECT_FAILURE,
      payload: error.response ? error.response.data : "Network Error",
    });
  }
};

export const acceptInvitation =
  (invitationToken, navigate) => async (dispatch) => {
    dispatch({ type: ACCEPT_PROJECT_INVITE_REQUEST });
    try {
      const { data } = await api.get("/api/v1/projects/invite/accept", {
        params: {
          token: invitationToken,
        },
      });
      navigate("/project/" + data.projectId);
      console.log("accept project----------- ", data);
      console.log("accept project----------- ", invitationToken);

      dispatch({ type: ACCEPT_PROJECT_INVITE_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: ACCEPT_PROJECT_INVITE_FAILURE,
        payload: error.response ? error.response.data : "Network Error",
      });
    }
  };
