import {
  ACCEPT_PROJECT_INVITE_REQUEST,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  FETCH_PROJECT_BY_ID_REQUEST,
  FETCH_PROJECT_BY_ID_SUCCESS,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  INVITE_TO_PROJECT_REQUEST,
  SEARCH_PROJECT_SUCCESS,
} from "./ActionTypes";

const initialState = {
  projects: [],
  isLoading: false,
  error: null,
  projectDetails: null,
  searchproject: [],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
    case CREATE_PROJECT_REQUEST:
    case DELETE_PROJECT_REQUEST:
    case FETCH_PROJECT_BY_ID_REQUEST:
    case ACCEPT_PROJECT_INVITE_REQUEST:
    case INVITE_TO_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: action.projects,
        error: null,
      };

    case SEARCH_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        searchProjects: action.projects,
        error: null,
      };

    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: [...state.projects, action.project],
        error: null,
      };

    case FETCH_PROJECT_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projectDetails: action.project,
        error: null,
      };

    case DELETE_PROJECT_SUCCESS:
      console.log(action.projectId);
      return {
        ...state,
        isLoading: false,
        projects: state.projects.filter(
          (project) => project.id !== action.projectId
        ),
        error: null,
      };
    default:
      return state;
  }
};
export default projectReducer;
